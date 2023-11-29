---
layout: page
title: Vergangene Events
permalink: /vergangene-events/
---

{% assign upcoming_events = site.events | where_exp: "item", "item.date < site.time" %}
{% for event in upcoming_events %}

<article>
    <p>
        <a href="{{ event.url }}"><date>{{ event.date | date: "%d.%m.%Y %H:%M" }}</date> - {{ event.title }}</a>
    </p>
</article>

{% endfor %}
