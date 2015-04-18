dscl . create /Users/$1
dscl . create /Users/$1 UserShell /bin/bash
dscl . create /Users/$1 UniqueID $2
dscl . create /Users/$1 PrimaryGroupID 1000
dscl . passwd /Users/$1 $3
# python $(pwd)/playground/$1/script.py
# kill -9 `ps -aux | grep ` . $1 . ` | awk '{print $2}'`
# dscl . delete /Users/$1
# rm -rf $(pwd)/playground/$1
