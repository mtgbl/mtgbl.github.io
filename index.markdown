---
layout: home
title: "Magic: The Gathering in Liestal"
---
{% assign spielweltenfabrik = site.locations | where: "name","Spielweltenfabrik" | first %}

Wir sind ein Verein, der regelmässig Magic: The Gathering spielt.
Jeden Freitag treffen wir uns in der [Spielweltenfabrik]({{ spielweltenfabrik.url }}) in Liestal.

Dort spielen wir meist [Booster Draft](https://magic.wizards.com/de/formats/booster-draft) oder [Commander](https://magic.wizards.com/de/formats/commander).
Die Spielabende sind öffentlich, auch Anfänger sind willkommen.
Anmeldungen über unsere [WhatsApp-Gruppe](https://chat.whatsapp.com/HQ7IINFrZB63esDNRqsIUw) sind erwünscht!

→ [Häufig gestellte Fragen](/faq)

---

{% assign upcoming_events = site.events | where_exp: "item", "item.date > site.time" | where_exp: "item", "item.type != 'cancelled'" %}
{% assign next_event = upcoming_events | first %}

## Nächster Event

{% include event.html event = next_event %}

---

## Neuigkeiten
