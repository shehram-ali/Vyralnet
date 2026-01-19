# Chat Screen Testing Guide

## Implementation Summary

The influencer chat screen has been successfully modified to hide the Email tab and only show the chat list. Brand users maintain their full functionality with both Messages and Email tabs.

## Changes Made

### Files Modified:
1. **`/app/(tabs)/chat.tsx`** - Main chat screen with user type detection
2. **`/app/(tabs)/settings.tsx`** - Added testing utility to switch user types

### Key Changes:
- Added `useAuth` hook to detect user type
- Conditional rendering based on `user?.userType === 'brand'`
- Tabs hidden for influencers
- Header always shows "Chat" for influencers
- Email functionality only accessible to brands

---

## Testing Instructions

### Prerequisites
- Expo development server running on device/emulator
- User must be logged in (either brand or influencer)

### Step 1: Access Testing Mode

1. Navigate to the **Settings** tab (bottom navigation)
2. Look for the **"TESTING MODE"** section with a green border
3. You'll see the current user type displayed

### Step 2: Test as Brand User

If not already a brand user, tap **"Switch User Type"** until it shows "Current: BRAND"

#### Expected Behavior for Brand:
- ✅ Navigate to **Chat** tab
- ✅ Two tabs visible: **"Messages"** and **"Email"**
- ✅ Email tab shows badge with number **"3"**
- ✅ Header shows **"Chat"** when Messages tab is active
- ✅ Header shows **"Email"** when Email tab is active
- ✅ Search bar visible below tabs
- ✅ **Messages Tab**:
  - Shows list of 7 chat items
  - Each chat has avatar, name, last message, timestamp
  - Search filters the chat list
  - Tapping a chat navigates to individual chat screen
- ✅ **Email Tab**:
  - Shows list of 6 email items
  - Each email has initials avatar, sender name, subject, preview, date
  - Tapping an email navigates to email viewer

#### Brand Test Checklist:
- [ ] Two tabs (Messages + Email) are visible
- [ ] Email badge shows "3"
- [ ] Header changes from "Chat" to "Email" when switching tabs
- [ ] Messages tab shows 7 chat items
- [ ] Email tab shows 6 email items
- [ ] Search bar filters chat messages correctly
- [ ] Can tap and navigate to individual chat
- [ ] Can tap and navigate to email viewer
- [ ] Tab switching works smoothly

### Step 3: Test as Influencer User

Go back to **Settings** tab and tap **"Switch User Type"** until it shows "Current: INFLUENCER"

#### Expected Behavior for Influencer:
- ✅ Navigate to **Chat** tab
- ✅ **NO tabs visible** (Messages/Email tabs hidden)
- ✅ Header always shows **"Chat"** (static, doesn't change)
- ✅ Search bar visible directly below header
- ✅ **Chat List**:
  - Shows list of 7 chat items immediately
  - Each chat has avatar, name, last message, timestamp
  - Search filters the chat list
  - Tapping a chat navigates to individual chat screen
- ✅ **NO email functionality** visible or accessible

#### Influencer Test Checklist:
- [ ] NO tabs visible (clean interface)
- [ ] Header shows only "Chat" (static)
- [ ] Chat list displayed immediately (no tab switching needed)
- [ ] Shows 7 chat items
- [ ] Search bar filters chats correctly
- [ ] Can tap and navigate to individual chat
- [ ] No email-related UI elements visible
- [ ] Layout is clean with search bar directly below header

### Step 4: Switch Between User Types

Test the transition between user types:

1. Start as **Brand** → Navigate to Chat → Verify tabs visible
2. Switch to **Influencer** → Navigate to Chat → Verify tabs hidden
3. Switch back to **Brand** → Navigate to Chat → Verify tabs reappear
4. Test multiple times to ensure consistent behavior

#### Transition Test Checklist:
- [ ] Switching from brand to influencer removes tabs
- [ ] Switching from influencer to brand shows tabs
- [ ] Chat data persists across user type changes
- [ ] Search functionality works in both modes
- [ ] Navigation works in both modes
- [ ] No UI glitches during transitions

---

## Edge Cases to Test

### Empty States:
- [ ] Test with search query that returns no results
- [ ] Verify "No messages yet" appears for empty chat list

### Navigation:
- [ ] Navigate to Chat from other tabs (Home, Discover, Stats, Settings)
- [ ] Verify correct UI renders on first load
- [ ] Test deep linking (if applicable)

### Performance:
- [ ] Switching tabs (brand only) is smooth
- [ ] Search filtering is responsive
- [ ] Scrolling through chat/email lists is smooth

---

## Known Behavior

### Brand Users:
- Default tab is "Messages"
- Email badge hardcoded to "3" (replace with dynamic count later)
- Clicking chat navigates to `/(features)/(brand)/chat`
- Clicking email navigates to `/(features)/(brand)/view-email`

### Influencer Users:
- No tab state (always shows chat list)
- Search filters only chat messages
- Same navigation as brand for individual chats
- Cannot access email functionality

---

## Code Reference

### User Type Detection (chat.tsx:136-137):
```typescript
const { user } = useAuth();
const isBrand = user?.userType === 'brand';
```

### Conditional Header (chat.tsx:289):
```typescript
{isBrand ? (activeTab === 'messages' ? 'Chat' : 'Email') : 'Chat'}
```

### Conditional Tabs (chat.tsx:294-299):
```typescript
{isBrand && (
  <View className="flex-row px-5 pb-4 bg-[#F8F8FB]">
    {renderTab('messages', 'Messages')}
    {renderTab('email', 'Email', 3)}
  </View>
)}
```

### Conditional Content (chat.tsx:316-346):
```typescript
{(!isBrand || activeTab === 'messages') ? (
  // Chat list for influencers OR brand with messages tab
  <FlatList data={filteredChats} ... />
) : (
  // Email list only for brand with email tab
  <FlatList data={mockEmails} ... />
)}
```

---

## Troubleshooting

### Issue: User type not switching
- **Solution**: Verify AuthProvider is properly configured
- Check AsyncStorage is working correctly

### Issue: Tabs still showing for influencers
- **Solution**: Check user object is not null
- Verify `user.userType === 'influencer'`
- Check console for errors

### Issue: Chat navigation not working
- **Solution**: Verify route exists at `/(features)/(brand)/chat`
- Check navigation params are correct

---

## Success Criteria

All tests pass when:
- ✅ Brand users see full functionality (Messages + Email tabs)
- ✅ Influencer users see simplified UI (only chat list, no tabs)
- ✅ Header behaves correctly for each user type
- ✅ Search works in both modes
- ✅ Navigation works for both user types
- ✅ No TypeScript errors
- ✅ No console errors
- ✅ Smooth transitions between user types
- ✅ No visual glitches or layout issues

---

## Rollback Plan

If issues are found, the changes can be reverted by:
1. Removing `useAuth` import from `chat.tsx`
2. Removing `isBrand` variable
3. Restoring original header, tabs, and content rendering
4. Removing testing utility from `settings.tsx`

All changes are isolated to these two files, making rollback simple and safe.

---

## Next Steps

After successful testing:
1. Remove testing utility from Settings screen (production)
2. Replace hardcoded email badge count with dynamic count
3. Consider adding user type indicator in UI (optional)
4. Update documentation with final behavior
5. Consider adding automated tests

---

## Notes

- This implementation maintains 100% backward compatibility with brand functionality
- No breaking changes to existing screens
- All brand screens remain untouched
- Testing utility is only for development (remove before production)
