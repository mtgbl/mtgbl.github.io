#!/usr/bin/env bash
# todo:
# iterate over all future events and update last_modified/num_of_changes,
# then commit changed files with ICS_LAST_MODIFIED_UPDATE in commit message
# https://github.com/stefanzweifel/git-auto-commit-action

EVENT_PATH="./_events/2026-04-03-event.markdown"
LAST_MODIFIED=$(git log -1 --pretty="format:%cI" ${EVENT_PATH})
# todo: reformat timestamp to 19960817T133000Z
NUM_CHANGES=$(git log --pretty=oneline ${EVENT_PATH}| grep -v "ICS_LAST_MODIFIED_UPDATE" | wc -l | tr -d '[:space:]')

result=$("yq -i --front-matter=process '.last_modified=\"${LAST_MODIFIED}\"' ${EVENT_PATH}")
if [ "$result" != 0 ]; then exit 1;fi
result=$("yq -i --front-matter=process '.num_of_changes=\"${NUM_CHANGES}\"' ${EVENT_PATH}")
if [ "$result" != 0 ]; then exit 1;fi
