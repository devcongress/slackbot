##How To Contribute
The ability to contribute and collaborate are what make **git** so great. This bot is still very young.
We want to keep it as easy as possible to contribute changes that get things working and the bot more useful.

There are a few guidelines that we need contributors to follow so that we can have a chance of keeping on top of things.


##Getting Started - How Can I Contribute
**Quick Overview**

* Make Sure you have a Github Account :)
* Fork the repository on GitHub
* Create a topic branch from where you want to base your work.
	* This is usually the master branch.
	* Only target other branches if you are certain your fix must be on that branch
* Make commits of logical units  		


###Submitting Bug Reports
Bugs :bug: are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've identified a bug, create an issue [here](https://github.com/devcongress/slackbot/issues/new) and provide the following information in the following template.

```
[Short description of problem here]

**Reproduction Steps:**

1. [First Step]
2. [Second Step]
3. [Other Steps...]

**Expected behavior:**

[Describe expected behavior here]

**Observed behavior:**

[Describe observed behavior here]

**Additional information:**
[any other thing you will like to share with regards to the bug]

**Screenshots and GIFs**

![Screenshots and GIFs which follow reproduction steps to demonstrate the problem](url)


```
```
[These are optional, add them to the Bug report if you must!]

**Botkit version:** [Enter Botkit version here]
**OS and version:** [Enter OS name and version here]

**Installed packages:**
[List of installed packages here]

```


### Submitting Issues

* You can create an issue [here](https://github.com/devcongress/slackbot/issues/new),
but before doing that please read the notes below and include as many details as
possible with your report. If you can, please include:
  * The version of Botkit you are using
  * The operating system you are using
  * If applicable, what you were doing when the issue arose and what you
  expected to happen
* Other things that will help resolve your issue:
  * Screenshots and animated GIFs
  * Error output that appears in your terminal, dev tools or as an alert
  * Perform a [cursory search](https://github.com/howdyai/botkit/issues?utf8=✓&q=is%3Aissue+)
  to see if a similar issue has already been submitted

### Submitting Pull Requests

* Include screenshots and animated GIFs in your pull request whenever possible.
* Follow the JavaScript coding style with details from `.jscsrc` and `.editorconfig` files and use necessary plugins for your text editor.
* Write documentation in [Markdown](https://daringfireball.net/projects/markdown).
* Please follow, [JSDoc](http://usejsdoc.org/) for proper documentation.
* Use short, present tense commit messages. See [Commit Message Styleguide](#git-commit-messages).
* Push to your topical branch on your fork and then submit a pull request



##Style Guides

Adopted from [Howdyai/botkit](https://github.com/howdyai/botkit/blob/master/CONTRIBUTING.md)

###General Code
* End files with a newline.
* Place requires in the following order:
  * Built in Node Modules (such as `path`)
  * Local Modules (using relative paths)
* Avoid platform-dependent code:
  * Use `path.join()` to concatenate filenames.
* Using a plain `return` when returning explicitly at the end of a function.
  * Not `return null`, `return undefined`, `null`, or `undefined`


### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Make commits of logical units  		
* Reference issues and pull requests liberally
