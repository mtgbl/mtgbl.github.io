---
layout: page
title: Bären
permalink: /baeren/
---

Wer einen Event gewinnt, wird zum Bären gekürt. Wer den amtierenden Bären im direkten Duell schlägt, erhält einen Extrapreis!

## Letzte Bären

{% assign past_events = site.events | where_exp: "item", "item.date < site.time"| where_exp: "item", "item.winner != nil" | group_by_exp: "item", "item.date | truncate: 4, ''"  | reverse %}
{% for year in past_events %}

### {{ year.name }}
{% assign year_events = year.items | reverse %}
{% for event in year_events %}

<p>
    <a href="{{ event.url }}"><date>{{ event.date | date: "%d.%m.%Y" }}</date> - {{ event.title }}</a>: <strong>{{ event.winner | default: "-" }}</strong>
</p>

{% endfor %}

{% endfor %}
