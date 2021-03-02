![image](/images/git-hooks/githooks.jpg)

## Git hooks — The unsung rescuers
###### *Jan 12, 2020*

What a git hook can do is constrained only by the 
developer’s imagination. Git hooks are one of 
the most productive hacks every software 
engineering team must possess.

**First things first:**

I assume the reader has some hands on experience 
with git and basic shell scripting. We will be 
going through only two types of git hooks in 
this write out. The intention is to introduced 
the reader to git hooks,not to explain details 
of different types of git hooks.

**The need:**

Keeping the application’s build pipeline always 
green is a skill. We all often see developers 
saying :

> “oh! the pull request build failed because of failing unit tests or integration tests”.
>
>“Ahh !! damn I have push the data base password into git.”

On a sincere note, committing passwords into git 
is a crime that a developer can potentially do 
unknowingly. I once read about a case study where 
a developer has committed the passwords of 
AWS instance which were eventually taken over 
by a hacker and whole AWS was compromised for the 
organization and used to mine crypto currency for 
24hrs. We can stop this using a pre-commit git hook.

To fix the above scenarios developers have to 
revert that commit or push a new commit with 
fixed test suite or by removing the password 
that is pushed. This eventually disturbs the 
commit history of the application.And yes, 
there is a difference between a developer 
and a good developer. We can be good developers. 
We can handle these types of common mistakes even 
before we commit the code into our local machines.

**Dive in:**

We will be going through pre-commit hook and 
pre-push hooks only in this write out. If you are 
interested in knowing more about different types 
of git hooks, refer [this link](https://git-scm.com/docs/githooks).

A pre-commit hook script will be executed every 
time you commit the code in to the local machine 
where as a pre-push hook script will be executed 
every time you push the code to git.

**Pre-commit hook to detect passwords in staged files:**

```shell script
#!/bin/bash

#Aborting the commit if the files contain any passwords.
files=$(git diff --cached --name-only --diff-filter=AM -- `find . -name '*.yml'`)

if [ -n "$files" ]; then
    if grep -E "password[ ]*[:|=][ ]*[a-z|A-Z|0-9]+" $files; then
        echo "$(tput setaf 1)Blocking the commit as a password was found.Please remove all the passwords and retry the commit."
        exit 1
    fi
fi
exit $RESULT
```
Above Code: https://gist.github.com/akhil-ghatiki/944db313e1fafa66d11c3f189b15eb1e#file-pre-commit-sh

We are using a regex here to detect any line 
of the type `password:<<text>>` in the staged 
files. (One needs to change this regex according 
to how passwords go into your code.)

**Pre-commit hook to abort commit for failing 
unit tests:**

```shell script
#!/bin/bash

#Abort the commit if the unit test cases fail
./gradlew test

RESULT=$?
if [ $RESULT -gt 0 ] ; then
  echo "$(tput setaf 1)You have failing unit test(s). Please fix them and re-try committing."
fi

exit $RESULT
```
Above code: https://gist.github.com/akhil-ghatiki/6ec1e96ec289ff37d861fed823afd560#file-pre-commit-2-sh

Of course, both the above implementations can 
go into one pre-commit git hook. Save the above 
file as pre-commit.sh

**Pre-push hook to abort pushing for 
failing integration tests:**
```shell script
#!/bin/bash

#Abort push when integration tests fail
./gradlew integrationTest
RESULT=$?
if [ $RESULT -gt 0 ] ; then
  echo "$(tput setaf 1)You have failing integration test(s). Please fix them and re-try pushing."
fi

exit $RESULT
```
Above code:https://gist.github.com/akhil-ghatiki/16ac55b276d6fb42d3f563db6a235dea#file-pre-push-sh

    Save the above file as pre-push.sh
    
Save these files in a folder “githooks” 
and run the below commands. So that any 
further changes can be made in these files 
and they will reflect in the git’s hooks.

```shell script
ln -s -f /Users/<<Path to your project folder>>/githooks/pre-commit ./.git/hooks/pre-commit

ln -s -f /Users/<<Path to your project folder>>/githooks/pre-push ./.git/hooks/pre-push
```

God Speed !!!!
