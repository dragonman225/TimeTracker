# Time Tracker

##### *A minimal time tracking and usage visualizing app.*

### Available Features

* Log activities and how long they take.

### Planned Features

* Export history to JSON
* Editable History Timeline
* Graphical Statistics
* Recommend Activity by Frequency and Current Time
* Support Storing History in Browser

### Develop for Android

##### Requirements

* Cordova

  ```bash
  $ npm install -g cordova
  ```

* Android SDK, JDK, Gradle

  Follow [Android Platform Guide #Installing the Requirements](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#installing-the-requirements)

  * Cheatsheet for Arch Linux

    > Warning: The installation takes more than 30 minutes and needs to download hundreds of MBs of dependencies.
  
    Install `android-sdk` and `android-sdk-build-tools` from AUR. Then,

    ```bash
    sudo chown -R $USER:$USER /opt/android-sdk
    ```
    
    Install Java and Gradle,
    
    ```bash
    sudo pacman -S jdk8-openjdk gradle
    archlinux-java set java-8-openjdk`
    ```

    Set environment variables,

    ```bash
    export JAVA_HOME=/usr/lib/jvm/default
    export ANDROID_HOME=/opt/android-sdk
    ```

    Accept Android-SDK license, [reference](https://github.com/ionic-team/ionic-cli/issues/1726)

    ```bash
    $ANDROID_HOME/tools/bin/sdkmanager "platforms;android-26"
    ```

##### Setup the Project

1. `git clone https://github.com/dragonman225/TimeTracker.git`
2. `cd TimeTracker`
3. `cordova platform add android`

##### Build APK

1. `cordova build android`
2. Get APK in `platfroms/android/app/build/outputs/apk/debug`

##### Debug on real device

1. Connect an Android phone with USB Debugging enabled to the computer.
2. `cordova run android`
3. Open `Chrome > Developer Tools > More Tools > Remote Devices`, choose your device to inspect.

##### Build Notes

* Fix error

  ```
  A problem occurred configuring project ':CordovaLib'.
  > Could not resolve all files for configuration ':CordovaLib:classpath'.
     > Could not find intellij-core.jar (com.android.tools.external.com-intellij:intellij-core:26.0.1).
  ```

  Open `platforms/android/CordovaLib/build.gradle`

  Change from this:

  ```
  repositories {
      jcenter()
      maven {
          url "https://maven.google.com"
      }
  }
  ```
    to this:
  ```
  repositories {
      maven {
          url "https://maven.google.com"
      }
      jcenter()
  }
  ```

### Develop for iOS

> *I haven't tried building for iOS.*

##### Requirements

* Cordova

  ```bash
  $ npm install -g cordova
  ```

* Xcode

  Follow [iOS Platform Guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/)

### Develop for Browser

1. Clone the project.
2. Open `www/index.html` in browser

### Release

> __This app is under heavy development and not ready for daily use.__

* Android: [Release Page](https://github.com/dragonman225/TimeTracker/releases/)
