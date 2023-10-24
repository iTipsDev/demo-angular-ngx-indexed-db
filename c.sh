LINE="-----------------------------------------------------------------------------------------------"
DLIN="==============================================================================================="
CDATE=$(date '+%Y-%m-%dT%H:%M')

echo $LINE
echo "git pull origin master"
echo $LINE
git pull origin master
echo $DLIN

echo $LINE
echo "git status"
echo $LINE
git status
echo $DLIN

echo $LINE
echo "git add"
echo $LINE
git add . --verbose
echo $LINE
echo "git commit"
echo $LINE
git commit -m "$CDATE"
echo $DLIN

echo $LINE
echo "git status"
echo $LINE
git status
echo $DLIN

echo $LINE
echo "git push origin master"
echo $LINE
git push origin master
echo $DLIN

echo $LINE
echo "git status"
echo $LINE
git status
echo $DLIN



