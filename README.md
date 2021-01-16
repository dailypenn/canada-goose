# Content Guide

### Daily Pennsylvanian

#### Home Page

**Centerpiece**

- 1 story from `centerpiece`

**Top Carousel**

- 2 stories from `app-top-news`
- 1 story from `app-top-opinion`
- 1 story from `app-top-sports`
- 1 story from `app-top-multimedia`
- ordering: news, opinion, sports, multimedia

_NOTE_: If the most recent story from `app-top-opinion` or `app-top-sports` or `app-top-multimedia` is published more than 4 days ago, it will be automatically replaced by an article from `app-top-news`

**Sections**

- `app-front-news`
- `app-front-opinion`
- `app-front-sports`
- `app-front-multimedia`

3 Stories for each section (user can reorder these sections and show/ hide each section)

_NOTE_: To avoid the same story showing up in both the carousel and the sections below it, just tag an article with either `app-top-xxx` or `app-front-xxx`

#### Discover Page

- A card for each category that links to their most recent stories

### 34th Street

#### Home Page

**Centerpiece**

**Top Carousel**

**Sections**

#### Discover

### Under the Button

---

# Installation Guide

Install [Expo App](https://docs.expo.io/get-started/installation/#2-expo-client-app-for-ios-and) on your mobile.

```
npm install
expo start
```

Once the QR code is generated, open the camera on your phone to scan the code. You should be prompted to open Expo.

If you are prompted to install _Expo CLI_ globally, enter Y.

If there is globalDeprecated errors, run `expo r -c` to start the app instead of `expo start`. This clears the expo cache.

---

# Wireframe

[Link](https://www.figma.com/file/sExr6OlPwSMzWTCVhUXCt3/The-Daily-Pennsylvanian-App?node-id=0%3A1)
