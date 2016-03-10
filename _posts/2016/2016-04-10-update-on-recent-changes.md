---
title: "Update on recent changes"
author: benmann
---

Bower has seen some smaller updates over the past months and while some of those were really challenging to get right, they bring a lot of improvements. Let’s take a look at some of the things that changed and improved.   

A small but important update was the change of our default `—-save` operator, which used to be the tilde (~) and has now been changed to the caret (^). That way Bower will be more inclusive for minor version updates, as you would expect. As usual this was a non-breaking change, so all packages using a tilde for versions still continue to work.   

We removed analytics from Bower! This is a pretty big one, as it was a much requested change that could lead to a break of automated uses of Bower, such as Travis CI builds. While you would be asked „May bower anonymously report usage statistics to improve the tool over time? (Y/n)“ upon using Bower for the first time, Bower is now completely silent in that regard. That being said, we’re also looking to replace the statistics we collect with some more meaningful data and already dropped the command-usage overview, as it is not useful to us or our users.   

Bower is now distributed with npm3. This was mainly needed due to a bug on Windows, where paths could become too long for the OS to handle. Especially the bundledDependencies gave us a headache in this situation, however npm3 solves this by using a flat structure, resulting in smaller paths.   

Paths in the .bowerrc configuration can now be absolute instead of only relative, which makes it easier and is what you might expect.  

We also learned that people are requiring files from Bower's core more or less randomly, which forced us to release version 1.7.6 quickly after 1.7.5 so builds didn’t break. In general there is only one correct way to use Bower programmatically and that is require('bower'). Relying on any specific file from Bower that is subject to change is never a great idea!

Apart from those changes there were many more bugfixes, small changes and documentation updates throughout the past months. Check the [changelog](https://github.com/bower/bower/blob/master/CHANGELOG.md) for a more detailed overview. 
**You can get all those updates and bugfixes by updating Bower via `npm install -g bower`.**   

We already have some great commits for the upcoming version and are always happy to see new people contributing. Step by in our [Discord channel](https://discord.gg/0fFM7QF0KpZRh2cY) or directly over at [GitHub](https://github.com/bower/bower).
