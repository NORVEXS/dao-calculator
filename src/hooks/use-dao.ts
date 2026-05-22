"use client";

import { useMemo } from "react";
import {
  buildExteriorProfile,
  computeDao,
  computeResponseCurve,
  CurvePoint,
  DaoParameters,
  DaoResult,
  ExteriorProfile,
} from "@/lib/scientific/dao";
import { useCalculatorStore } from "@/store/calculator-store";

/** Memoized exterior-illuminance profile for the active parameters. */
export function useExteriorProfile(params?: DaoParameters): ExteriorProfile {
  const storeParams = useCalculatorStore((s) => s.params);
  const p = params ?? storeParams;
  return useMemo(() => buildExteriorProfile(p), [p]);
}

/** A stable compute function bound to the active profile + threshold. */
export function useDaoCompute(): {
  profile: ExteriorProfile;
  threshold: number;
  compute: (df: number) => DaoResult;
} {
  const params = useCalculatorStore((s) => s.params);
  const profile = useMemo(() => buildExteriorProfile(params), [params]);
  return useMemo(
    () => ({
      profile,
      threshold: params.thresholdLux,
      compute: (df: number) => computeDao(profile, df, params.thresholdLux),
    }),
    [profile, params.thresholdLux],
  );
}

/** DF → (DAo, DAo.con) response curve for the active parameters. */
export function useResponseCurve(samples = 161, max = 8): CurvePoint[] {
  const params = useCalculatorStore((s) => s.params);
  return useMemo(() => {
    const profile = buildExteriorProfile(params);
    return computeResponseCurve(profile, params.thresholdLux, {
      min: 0,
      max,
      samples,
    });
  }, [params, samples, max]);
}
