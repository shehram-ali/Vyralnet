# SVG Setup Guide

## How to Add and Use SVG Icons

### 1. Add SVG Files
Place your SVG files in the `assets/images/` directory with the same names as the PNG files:

```
assets/images/
├── Challenge.svg
├── AddFriend.svg
├── FindInfluencer.svg
├── User.svg
├── BusinessContract.svg
├── CreateFile.svg
├── Checklist.svg
└── MoneyBag.svg
```

### 2. Update the Image Index
Once you add the SVG files, update `assets/images/index.ts`:

```typescript
// SVG Icons (import as React components)
export { default as ChallengeSvg } from './Challenge.svg';
export { default as AddFriendSvg } from './AddFriend.svg';
export { default as FindInfluencerSvg } from './FindInfluencer.svg';
export { default as UserSvg } from './User.svg';
export { default as BusinessContractSvg } from './BusinessContract.svg';
export { default as CreateFileSvg } from './CreateFile.svg';
export { default as ChecklistSvg } from './Checklist.svg';
export { default as MoneyBagSvg } from './MoneyBag.svg';
```

### 3. Use in Home Screen
Update the home screen to use SVG components:

```typescript
import {
  ChallengeSvg,
  AddFriendSvg,
  // ... other SVG imports
} from 'assets/images';

const brandFeatures = [
  {
    title: 'Challenges',
    icon: <ChallengeSvg width={56} height={56} />,
    backgroundColor: '#F5E6D3',
    route: ROUTES.FEATURES.CHALLENGES,
  },
  // ...
];
```

### 4. Configuration Complete
✅ Metro bundler configured to handle SVG files
✅ TypeScript declarations added for SVG imports
✅ FeatureCard component supports both image and icon props

### Benefits of SVG:
- ✨ Sharp at any size (no blurriness)
- 🎨 Can be styled with props (color, size)
- 📦 Smaller file size
- 🚀 Better performance

## Current Setup:
- **react-native-svg**: ✅ Installed
- **react-native-svg-transformer**: ✅ Installed
- **metro.config.js**: ✅ Configured
- **TypeScript declarations**: ✅ Added
- **Image size increased**: ✅ 56x56 (from 24x24)
