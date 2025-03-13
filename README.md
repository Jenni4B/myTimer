# Focus Timer Application

A customizable timer interface to help users maintain concentration during work sessions.
## Features

✔ Customizable timer – Adjust both minutes and seconds.

✔ Full control – Start, Pause, Resume, and Reset at any time.

✔ Browser notifications – Alerts when the timer hits 00:00.

✔ Light & Dark Mode – Choose between a sunrise-themed light mode or a midnight purple dark mode (because grey is boring).

✔ Error handling – Prevents invalid inputs like setting the timer to 00:00.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Jenni4B/myTimer.git
   cd myTimer
   
2. Install basic dependencies
   ```sh
   npm install

3. Run :D
   ```sh
   npm run dev

## How to Use
1. Start a Session by clicking the "Start" button
   You can pick a custom session, adjusting the minutes AND seconds

2. Click the "Start" button

3. The timer will begin counting down from 25:00 or whatever custom time you chose

4. Click "Pause" to temporarily stop the timer.
   Click "Resume" to continue from where you left off.

5. The Reset button is disabled while the timer is running. 
   If the timer is paused, the Reset button becomes available. The timer resets to the default value or the custom value

## Future Features
1. More themes? 👀

2. Charts for data
   2.1 Daily streaks
   2.2 Hours Spent
   2.3 Download data

3. Plans to fix the progression bar on the timer card, visible but not moving
   3.1 I want it to be a rainbow as it progresses
   3.2 It's not in the spot that I want it to be


## Updates

### Update 2/25/2025
1. The Start Button becomes a resume and pause button depending on the state of the timer.
2. The reset button is unavailable when the timer is counting down but can be pressed when the timer is paused.
3. Light and Dark mode! Light mode is a sunrise theme while night mode is an evening/midnight purple vibe. Because grey is boring


### Update 3/13/2025
1. Achievements page 🏆
2. Session tracking, tracks how many sessions the user did on the account
3. Reset all data
   3.1 Wipe Data button is in the Danger Zone at the bottom of the settings page
   3.2 Wipes achievement page, session counter, theme settings, and custom timer settings