# Quick Test Checklist - Chat Screen

## 🚀 Quick Start
1. **Open your Expo app** on device/emulator
2. Go to **Settings tab**
3. Use **"Switch User Type"** button in "TESTING MODE" section
4. Navigate to **Chat tab** to test

---

## ✅ BRAND USER - Quick Checks

### Visual
- [ ] Two tabs visible: "Messages" + "Email" (with badge "3")
- [ ] Messages tab is green (active)
- [ ] Email tab is gray (inactive)
- [ ] Header shows "Chat"

### Messages Tab
- [ ] 7 chat items visible
- [ ] Search bar works
- [ ] Can tap on chat item → navigates to chat screen

### Email Tab
- [ ] Tap Email tab → tab turns green
- [ ] Header changes to "Email"
- [ ] 6 email items visible
- [ ] Can tap on email → navigates to email viewer

### Tab Switching
- [ ] Switch tabs back and forth → smooth, instant
- [ ] Header updates correctly
- [ ] Content updates correctly

---

## ✅ INFLUENCER USER - Quick Checks

### Visual
- [ ] **NO tabs visible** (clean interface)
- [ ] Header shows "Chat" only
- [ ] Search bar directly below header

### Chat List
- [ ] 7 chat items visible immediately
- [ ] Search bar works
- [ ] Can tap on chat item → navigates to chat screen

### Email
- [ ] **No way to access email** (correct!)
- [ ] No Email tab
- [ ] No email functionality

---

## ✅ SWITCHING - Quick Checks

### Brand → Influencer
- [ ] Go to Settings → Switch to Influencer
- [ ] Return to Chat → tabs disappear
- [ ] Chat list still visible

### Influencer → Brand
- [ ] Go to Settings → Switch to Brand
- [ ] Return to Chat → tabs appear
- [ ] Messages tab active, chat list visible

---

## ✅ EMPTY STATE - Quick Check

### Test Empty State
- [ ] Search for "zzzzz" (non-existent)
- [ ] EmptyChatSvg displays (illustration)
- [ ] "No messages yet" text shows
- [ ] Clear search → chats reappear

---

## 🎯 Critical Tests (Must Pass)

1. **Brand users see tabs** ✓
2. **Influencers don't see tabs** ✓
3. **Header changes for brands, static for influencers** ✓
4. **Search works for both** ✓
5. **Navigation works for both** ✓
6. **Empty state shows EmptyChatSvg** ✓
7. **Switching preserves functionality** ✓

---

## 📸 Screenshots Needed

Take screenshots of:
1. Brand user - Messages tab
2. Brand user - Email tab
3. Influencer user - Chat view
4. Empty state with EmptyChatSvg
5. Settings - Testing Mode section

---

## 🐛 Common Issues to Watch For

- Tabs not hiding for influencers
- Header not updating
- Email accessible to influencers (should NOT be)
- Search not filtering
- Empty state not showing SVG
- User type not persisting after switch

---

## ✅ Success Criteria

**ALL of these must be true:**
- ✅ Brand users have full functionality (Messages + Email)
- ✅ Influencer users see simplified UI (Chat only)
- ✅ No TypeScript errors
- ✅ No console errors
- ✅ Smooth performance
- ✅ Switching works flawlessly
- ✅ Empty state displays properly

---

## 📝 Report Issues

If you find any issues, note:
- User type (Brand or Influencer)
- What you did (steps)
- What happened (actual result)
- What should happen (expected result)
- Screenshot (if visual issue)
