---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: "Magic: The Gathering in Liestal"
---

Wir sind ein Verein, der regelmässig Magic: The Gathering spielt. Fast jeden Freitag treffen wir uns im Rathauskeller in Liestal.

Dort spielen wir meist [Booster Draft](https://magic.wizards.com/de/formats/booster-draft) oder [Commander](https://magic.wizards.com/de/formats/commander).
Die Spielabende sind öffentlich, auch Anfänger sind willkommen. Anmeldungen über unsere [WhatsApp-Gruppe](https://chat.whatsapp.com/HQ7IINFrZB63esDNRqsIUw) sind erwünscht!

---

{% assign upcoming_events = site.events | where_exp: "item", "item.date > site.time" %}
{% assign next_event = upcoming_events | first %}

## Nächster Event

<article>
    <header>
        <h3><a href="{{next_event.url}}"><date>{{ next_event.date | date: "%d.%m.%Y %H:%M" }}</date> - {{ next_event.title }}</a></h3>
    </header>
{% if next_event.content %}
    <p>{{ next_event.content | markdownify }}</p>
{% endif %}
</article>

---

## Neuigkeiten
