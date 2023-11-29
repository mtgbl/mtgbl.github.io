---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
title: "Magic: The Gathering in Liestal"
---
{% assign rathauskeller = site.locations | where: "name","Rathauskeller" | first %}

Wir sind ein Verein, der regelmässig Magic: The Gathering spielt.
Jeden Freitag treffen wir uns im [Rathauskeller]({{ rathauskeller.url }}) in Liestal.

Dort spielen wir meist [Booster Draft](https://magic.wizards.com/de/formats/booster-draft) oder [Commander](https://magic.wizards.com/de/formats/commander).
Die Spielabende sind öffentlich, auch Anfänger sind willkommen.
Anmeldungen über unsere [WhatsApp-Gruppe](https://chat.whatsapp.com/HQ7IINFrZB63esDNRqsIUw) sind erwünscht!

---

{% assign upcoming_events = site.events | where_exp: "item", "item.date > site.time" %}
{% assign next_event = upcoming_events | first %}

## Nächster Event

{% include event.html event = next_event %}

---

## Neuigkeiten
