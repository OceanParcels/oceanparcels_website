---
title: 'PolyTEOS10_bsq Kernel Bug Identified'
date: '2025-08-05'
authors:
  - name: Michael Denes
    github: michaeldenes
summary: 'An issue with the `PolyTEOS10_bsq` kernel has been identified, where incorrect values of seawater density were being computed. In this post, we explain the issue and how it may impact your simulations.'
---

**Update to `PolyTEOS10_bsq` kernel**

In recent days we’ve come across a bug in an application kernel of `parcels`. The `PolyTEOS10_bsq` kernel is used to calculate the density of seawater from the temperature and salinity fields. The kernel is based on equation (13) from
[Roquet et al. (2014)](https://doi.org/10.1016/j.ocemod.2015.04.002) where the density $\rho$ is determined from the summation of a vertical reference profile $r_0$ and a residual function or density anomaly $r$. That is, $\rho(S,T,z) = r_0(z) + r(S,T,z)$.

Up until the fix in [PR #2133](https://github.com/OceanParcels/Parcels/pull/2133), the kernel only computed the density anomaly $r$, and did not include the vertical reference profile. At the ocean surface this isn’t a problem, as $r_0(z=0) = 0$ and so the computed density was correct. However, $r_0(z)>0$ below the ocean surface, and at relatively deep depths, this value can be significant. For example, at 100 m depth this value is 0.46443 kg/m$^3$ and at 500 m depth this value is 2.31175 kg/m$^3$, see the figure below.

![Vertical reference profile as a function of depth](/posts/polyteos10-kernel/depth_vs_r0.png)

By using the kernel implementation before the fix in PR [#2133](https://github.com/OceanParcels/Parcels/pull/2133), the seawater density at depths below the ocean surface were being underestimated, as the actual seawater density would have otherwise been higher. Simulations that computed vertical velocities (such as sinking/rise velocities) using density differences between a particle and its surrounding seawater may have been impacted.

Below we’ve compiled a list of several papers that may be impacted, but we urge the community to check their own projects for use of this kernel at depth. This list may be updated as we become aware of other potentially impacted papers.

**Potentially impacted papers**

- [Global mass of buoyant marine plastics dominated by large long-lived debris, _Nature Geoscience_ (2023)](https://doi.org/10.1038/s41561-023-01216-0)
- [Modeling carbon export mediated by biofouled microplastics in the Mediterranean Sea, _Limnology and Oceanography_ (2023)](https://doi.org/10.1002/lno.12330)
- [Modelling submerged biofouled microplastics and their vertical trajectories, _Biogeosciences_ (2022)](https://doi.org/10.5194/bg-19-2211-2022)
- [Influence of Particle Size and Fragmentation on Large-Scale Microplastic Transport in the Mediterranean Sea, _Environmental Science & Technology_ (2022)](https://doi.org/10.1021/acs.est.2c03363)
- [Global Modeled Sinking Characteristics of Biofouled Microplastic, _JGR Oceans_ (2021)](https://doi.org/10.1029/2020JC017098)
