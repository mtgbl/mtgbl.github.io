#!/usr/bin/env bash

set -x
# todo:
# iterate over all future events and update last_modified/num_of_changes,
# then commit changed files with ICS_LAST_MODIFIED_UPDATE in commit message
# https://github.com/stefanzweifel/git-auto-commit-action


NOW=$(date +%s)

for EVENT_PATH in _events/*.markdown; do
    if [ -f "$EVENT_PATH" ]; then
        FILE_DATE=$(basename ${EVENT_PATH} | cut -f -3 -d '-' | xargs date +%s -d)

        # only edit events in the future
        if [ $FILE_DATE -ge $NOW ];
        then
            # last commit not being an ICS_LAST_MODIFIED_UPDATE
            LAST_COMMIT=$(git log --pretty=oneline ${EVENT_PATH} | grep -v "ICS_LAST_MODIFIED_UPDATE" | tail -n 1 | cut -f 1 -d ' ')

            # get timestamp of LAST_COMMIT and format it
            LAST_MODIFIED=$(git show --no-patch --format=%cI ${LAST_COMMIT} | sed -re 's/\+[0-9]{2}\:[0-9]{2}//g' | sed -e 's/[-:]//g')

            # get number of non-ICS_LAST_MODIFIED_UPDATE commits of that file
            NUM_CHANGES=$(git log --pretty=oneline ${EVENT_PATH} | grep -v "ICS_LAST_MODIFIED_UPDATE" | wc -l | tr -d '[:space:]')

            yq -i --front-matter=process ".last_modified=\"${LAST_MODIFIED}00Z\"" ${EVENT_PATH}
            yq -i --front-matter=process ".num_of_changes=${NUM_CHANGES}" ${EVENT_PATH}
        fi
    fi
done

exit 0;





#EVENT_PATH='_events/2026-04-03-event.markdown'
#FILE_DATE=$(basename ${EVENT_PATH} | cut -f -3 -d '-' | xargs date +%s -d)
#
## only edit events in the future
#if [ $FILE_DATE -ge $NOW ];
#then
#    # last commit not being an ICS_LAST_MODIFIED_UPDATE
#    LAST_COMMIT=$(git log --pretty=oneline ${EVENT_PATH} | grep -v "ICS_LAST_MODIFIED_UPDATE" | tail -n 1 | cut -f 1 -d ' ')
#
#    # get timestamp of LAST_COMMIT and format it
#    LAST_MODIFIED=$(git show --no-patch --format=%cI ${LAST_COMMIT} | sed -re 's/\+[0-9]{2}\:[0-9]{2}//g' | sed -e 's/[-:]//g')
#
#    # get number of non-ICS_LAST_MODIFIED_UPDATE commits of that file
#    NUM_CHANGES=$(git log --pretty=oneline ${EVENT_PATH} | grep -v "ICS_LAST_MODIFIED_UPDATE" | wc -l | tr -d '[:space:]')
#
#    yq -i --front-matter=process ".last_modified=\"${LAST_MODIFIED}00Z\"" ${EVENT_PATH}
#    yq -i --front-matter=process ".num_of_changes=${NUM_CHANGES}" ${EVENT_PATH}
#fi
