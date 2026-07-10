# Project Case Study Brief Template

Use this file as the copy-paste brief for future portfolio project pages.

## How To Prepare

1. Create a folder for the new project references:

```text
ref/projects N/
```

2. Add section screenshots named clearly:

```text
ref/projects N/section 1.png
ref/projects N/section 2.png
ref/projects N/section 3.png
```

3. If a section contains placeholder artwork, add the isolated placeholder images too:

```text
ref/projects N/[section name] placeholder.png
ref/projects N/[phone scroll content].png
ref/projects N/[dashboard placeholder].png
```

4. Treat all images in `ref/` as design references or temporary placeholders. Production assets should be copied into `assets/[project-slug]/`.

## Copy-Paste Prompt

```text
Task tiếp theo là: [PROJECT NAME] (projects [N]).

Tôi đã xong các projects khác rồi. Hãy đọc lại các project cũ gần style nhất để tham khảo:
- [project-livefest.html / project-live-pro.html / project-live-legend.html / project-community-01.html / project-community-02.html]

Yêu cầu chung:
- Tạo hoặc cập nhật trang project [N].
- Style/font/format chữ phải đồng nhất với các project cũ, ưu tiên `var(--font-display)` / Helvetica Now Display, không tự thêm font mới nếu tôi không yêu cầu.
- Toàn bộ hình trong folder `ref/` chỉ là reference hoặc placeholder.
- Nếu tôi gửi ảnh section screenshot, chỉ dùng để hiểu layout.
- Nếu tôi gửi ảnh placeholder tách riêng, hãy dùng ảnh đó làm placeholder trong trang.
- Copy placeholder từ `ref/projects [N]/` sang `assets/[project-slug]/`, rồi dùng path trong `assets/`.
- Nếu có phone frame/scroll animation, lấy pattern từ project cũ gần nhất:
  - `project-community-01.html` section “MOY Campaign Revenue”
  - hoặc `project-community-02.html` section “Offline Merchandise & Event Assets”
- Sau khi làm xong phải kiểm tra desktop/mobile, không tràn ngang, font không bị dày/lệch so với project cũ, ảnh không lấn nhau.

References:
Section 1: "[ABSOLUTE PATH TO SECTION 1]"
Section 1 placeholder assets:
- "[ABSOLUTE PATH TO PLACEHOLDER 1]"

Section 2: "[ABSOLUTE PATH TO SECTION 2]"
Section 2 placeholder assets:
- "[ABSOLUTE PATH TO DASHBOARD PLACEHOLDER]"
- "[ABSOLUTE PATH TO PHONE SCROLL CONTENT]"

Section 3: "[ABSOLUTE PATH TO SECTION 3]"
Section 3 placeholder assets:
- "[ABSOLUTE PATH TO PLACEHOLDER 3]"

Content/copy:
- Hero/title: "[TITLE]"
- Role/copy: "[COPY]"
- Section 2 copy: "[COPY]"
- Section 3 copy: "[COPY]"

Navigation:
- Previous project: [file.html]
- Next project: [file.html]

Homepage/work archive:
- Add this project to homepage if this should be featured.
- Add this project to `work.html` if this should appear in All Works.
- Update project count and tests if the count changes.
```

## Rules For The AI

- Read existing project pages before designing.
- Do not invent a new visual system.
- Keep typography consistent with existing project pages:
  - Display headings: `var(--font-display)`, heavy weight, tight line-height.
  - Body/caption copy: existing Inter/body style.
  - Do not use a new Google display font unless explicitly requested.
- Section screenshots are layout references, not final image assets.
- Isolated placeholder images are the actual temporary visuals to render.
- Prefer exact layout imitation over generic redesign.
- Reuse existing phone chassis and scroll cue behavior.
- Add only scoped page CSS inside the project HTML unless a shared pattern is truly reusable.
- Keep mobile responsive: no horizontal overflow, no overlapping text, no cropped important content.

## Verification Checklist

Run these before finishing:

```powershell
npm test
```

Also visually verify:

- Desktop hero matches the reference proportions.
- Mobile layout has no horizontal overflow.
- Fonts match existing project pages.
- Placeholder images are loaded from `assets/[project-slug]/`, not `ref/`.
- Phone scroll content is actually scrollable.
- Homepage/work links resolve if updated.

## Example From Project 05

Project 05 used this pattern:

```text
ref/projects 5/section 1.png                         -> layout reference
ref/projects 5/campaign overview placholder.png      -> rendered placeholder
ref/projects 5/section 2.png                         -> layout reference
ref/projects 5/Planning dashboard placeholder.png     -> rendered dashboard
ref/projects 5/phone scroll content - Ranking UI.png  -> phone scroll content
ref/projects 5/section 3.png                         -> layout reference
ref/projects 5/...custom placholder.png              -> rendered swag placeholder
```

