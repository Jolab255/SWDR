import { SvgIcon } from '@mui/material';
import type { SvgIconProps } from '@mui/material';

// 1. Classic Hollow Molar Tooth Icon (for Free Treatment Services / Donate Dental Equipment)
export function ToothIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2C8.5 2 6 4.5 6 8.5C6 11.5 6.5 14.5 7 17.5C7.2 18.8 8.2 20 9.5 20C10.8 20 11.8 19.5 12 18.5C12.2 19.5 13.2 20 14.5 20C15.8 20 16.8 18.8 17 17.5C17.5 14.5 18 11.5 18 8.5C18 4.5 15.5 2 12 2Z"
      />
    </SvgIcon>
  );
}

// 2. Toothbrush Icon (for Oral Health Education)
export function ToothbrushAndPasteIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      {/* Sleek diagonal toothbrush handle */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 21l13-13"
      />
      {/* Brush head */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.5 9.5l3-3a2.12 2.12 0 0 1 3 3l-3 3z"
      />
      {/* Bristles */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M16 5l2.5 2.5M17.5 3.5L20 6"
      />
    </SvgIcon>
  );
}

// 3. Classic Dental Mirror Icon (for Dental Screening)
export function DentalMirrorIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <circle cx="15" cy="9" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M12.2 11.8l-9.2 9.2"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        d="M14 7l2 2"
        opacity="0.6"
      />
    </SvgIcon>
  );
}

// 4. Mobile Dental Van / Outreach Truck Icon (for Mobile Dental Services)
export function MobileDentalVanIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      {/* Truck Cab & Body (Lucide outline style) */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 18H9"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"
      />
      {/* Medical Cross on the van body side */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M6 10h4M8 8v4"
      />
      {/* Wheels */}
      <circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
    </SvgIcon>
  );
}

// 5. Shield Icon (for Community - maps to ToothShieldIcon for backward compatibility)
export function ShieldIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
      />
    </SvgIcon>
  );
}
export const ToothShieldIcon = ShieldIcon;

// 6. Heart Icon (for Compassion - maps to ToothInsideHeartIcon for backward compatibility)
export function HeartIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
      />
    </SvgIcon>
  );
}
export const ToothInsideHeartIcon = HeartIcon;

// 7. Scale Icon (for Transparency - maps to DentalMirrorAndProbeIcon for backward compatibility)
export function ScaleIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v18" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 21h10" />
    </SvgIcon>
  );
}
export const DentalMirrorAndProbeIcon = ScaleIcon;

// 8. Crown Icon (for Excellence - maps to ToothWithCrownIcon for backward compatibility)
export function CrownIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"
      />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
    </SvgIcon>
  );
}
export const ToothWithCrownIcon = CrownIcon;

// 9. Users/People Icon (for Volunteer sections)
export function UsersIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 3.128a4 4 0 0 1 0 7.744" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <circle cx="9" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </SvgIcon>
  );
}

// 10. Flag Icon (for Outreach / Starting milestones)
export function FlagIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </SvgIcon>
  );
}

// 11. Milestone Signpost Icon (for Timeline/Journey)
export function MilestoneIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 13v8" />
      <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v3" />
    </SvgIcon>
  );
}
