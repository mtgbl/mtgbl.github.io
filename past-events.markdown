---
layout: page
title: Vergangene Events
permalink: /vergangene-events/
---

{% assign past_events = site.events | where_exp: "item", "item.date < site.time" | where_exp: "item", "item.type != 'cancelled'" %}
{% for event in past_events %}

<article>
    <p>
        <a href="{{ event.url }}"><date>{{ event.date | date: "%d.%m.%Y %H:%M" }}</date> - {{ event.title }}</a>
    </p>
</article>

{% endfor %}
