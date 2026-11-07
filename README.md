# Pipe Calculator — โปรเจกต์ Android

แอปคำนวณอัตราไหลน้ำ เลือกขนาดท่อ และหา friction loss ของท่อน้ำชิลเลอร์ (Closed loop / Open loop)
ห่อด้วย [Capacitor](https://capacitorjs.com) 8 เป็นแอป Android ทำงานออฟไลน์ได้ทั้งหมด (ฟอนต์และการคำนวณอยู่ในแอป)

> โฟลเดอร์นี้ยังไม่ได้ build เป็น APK เพราะเครื่องที่เตรียมไฟล์ไม่มี Android SDK
> ผ่านการทดสอบเฉพาะตัวหน้าเว็บ (`www/`) ขั้นตอนด้านล่างต้องทำบนเครื่องที่ลง Android Studio

## โครงสร้าง

```
www/                      ตัวแอป (index.html ไฟล์เดียว, ฟอนต์ IBM Plex แบบ woff2, ไอคอน, manifest, sw.js)
android/                  โปรเจกต์ Android Studio ที่สร้างไว้แล้ว (มีไอคอนและ splash ครบ)
resources/                ภาพต้นฉบับไอคอนและ splash (ใช้สร้างไอคอนใหม่)
capacitor.config.json     ชื่อแอป, appId, การจัดการขอบหน้าจอ
package.json
```

## สิ่งที่ต้องติดตั้งก่อน

1. Node.js 22 ขึ้นไป
2. Android Studio (ติดตั้ง Android SDK Platform 36 ผ่าน SDK Manager, JDK มากับ Android Studio แล้ว)

## วิธีที่ 1: build ด้วย Android Studio (แนะนำ)

```bash
npm install
npx cap sync android
npx cap open android
```

ใน Android Studio รอ Gradle sync เสร็จ แล้วเลือก **Build > Build Bundle(s) / APK(s) > Build APK(s)**
ไฟล์จะอยู่ที่ `android/app/build/outputs/apk/debug/app-debug.apk`
หรือกดปุ่ม Run เพื่อลงเครื่องจริงที่เสียบสาย USB (เปิด USB debugging) หรือ emulator

## วิธีที่ 2: build จาก command line

ต้องมี JDK 17 ขึ้นไป และตั้ง `ANDROID_HOME` ชี้ไปที่ Android SDK

```bash
npm install
npm run apk            # macOS/Linux
# Windows: npx cap sync android && cd android && gradlew.bat assembleDebug
```

## ติดตั้ง APK ลงมือถือ

คัดลอกไฟล์ `app-debug.apk` ไปที่มือถือ เปิดไฟล์ แล้วอนุญาต "ติดตั้งแอปจากแหล่งที่ไม่รู้จัก" ของแอปที่ใช้เปิดไฟล์

## แก้ไขแอป

แก้ที่ `www/index.html` (การคำนวณอยู่ใน `<script>` ตัวแรก ส่วนหน้าจออยู่ในตัวที่สอง) แล้วรัน

```bash
npx cap sync android
```

จากนั้น build ใหม่ ถ้าแก้ไฟล์ใน `www/` ที่ต้องการให้ PWA อัปเดต ให้เปลี่ยน `VERSION` ใน `www/sw.js` ด้วย

## ก่อนขึ้น Google Play

- **เปลี่ยน appId:** ค่าตั้งต้น `th.co.witmongkol.pipecalculator` เป็นค่าสมมติ ให้เปลี่ยนเป็นชื่อโดเมนจริงของบริษัท
  ลบโฟลเดอร์ `android/` แก้ `appId` ใน `capacitor.config.json` แล้วรัน `npx cap add android`, `npm run assets`, `npx cap sync android`
  appId ตั้งแล้วเปลี่ยนไม่ได้หลังเผยแพร่
- **เลขเวอร์ชัน:** แก้ `versionCode` และ `versionName` ใน `android/app/build.gradle` ทุกครั้งที่อัปโหลดเวอร์ชันใหม่
- **ไฟล์เผยแพร่:** Android Studio เลือก **Build > Generate Signed App Bundle / APK** สร้าง keystore ใหม่แล้วเก็บไฟล์และรหัสผ่านไว้ให้ดี
  ถ้าทำหาย จะอัปเดตแอปเดิมไม่ได้
- **เปลี่ยนไอคอนหรือ splash:** แทนไฟล์ใน `resources/` แล้วรัน `npm run assets`

## ทางเลือก: ติดตั้งเป็น PWA โดยไม่ต้องใช้ Android Studio

อัปโหลดโฟลเดอร์ `www/` ไปไว้บนโฮสต์ที่เป็น HTTPS (เช่น GitHub Pages) เปิดลิงก์ใน Chrome บนมือถือ
แล้วเลือก "ติดตั้งแอป" / "Add to Home screen" แอปจะทำงานออฟไลน์ได้ด้วย service worker
ถ้าต้องการไฟล์ APK/AAB จาก URL นี้ ใช้ [PWABuilder](https://www.pwabuilder.com) ได้

## สิ่งที่ควรตรวจบนเครื่องจริง

- แถบสถานะด้านบนและแถบสรุปติดขอบล่างไม่ทับเนื้อหา (ตั้งค่าไว้ใน `capacitor.config.json` หัวข้อ `SystemBars`)
- ปุ่มสลับธีมมืด/สว่างตามระบบ และปุ่มคัดลอกสรุปผล

## ลิขสิทธิ์ที่เกี่ยวข้อง

ฟอนต์ IBM Plex Sans Thai และ IBM Plex Mono เผยแพร่ภายใต้ SIL Open Font License 1.1
โลโก้เป็นของบริษัท วิทย์มงคล จำกัด

## Build ด้วย GitHub (ไม่ต้องลง Android Studio)

ชุดนี้ไม่มีโฟลเดอร์ `android/` GitHub จะสร้างให้เองตอน build (ไฟล์น้อย อัปโหลดผ่านหน้าเว็บได้)

1. สร้าง repository ใหม่ แล้วอัปโหลดไฟล์ทั้งหมด **ข้างใน** โฟลเดอร์นี้ที่ชั้นบนสุดของ repo (รวม `.github`)
2. เปิดแท็บ Actions รอ workflow "Build Android APK" (5-10 นาที)
3. ดาวน์โหลด **pipe-calculator-apk** จากหัวข้อ Artifacts จะได้ `app-debug.apk`
