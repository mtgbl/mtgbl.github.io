---
layout: page
title: Nächste Events
permalink: /events/
---
{% assign upcoming_events = site.events | where_exp: "item", "item.date > site.time" | where_exp: "item", "item.type != 'cancelled'" %}
{% for event in upcoming_events limit: 10 %}

<article>
    <p>
        <a href="{{ event.url }}"><date>{{ event.date | date: "%d.%m.%Y %H:%M" }}</date> - {{ event.title }}</a>
    </p>
</article>

{% endfor %}

---

[Vergangene Events](/vergangene-events)

  <a href="/events.ics" target="_blank" title="Event-Kalender">
    <span class="grey fa-regular fa-calendar fa-lg"></span>
zukünftige Events im abonnierbaren iCalendar-Format
  </a>
