---
layout: page
title: Bären
permalink: /baeren/
---

Wer einen Event gewinnt, wird zum Bären gekürt. Wer den amtierenden Bären im direkten Duell schlägt, erhält einen Extrapreis!

## Letzte Bären
Siehe auch: [Bären-Statistik nach Jahr](/stats/baer/)

{% assign past_events = site.events | where_exp: "item", "item.date < site.time"| where_exp: "item", "item.winner != nil" | group_by_exp: "item", "item.date | truncate: 4, ''"  | reverse %}
{% for year in past_events %}

### {{ year.name }}
{% assign year_events = year.items | reverse %}
{% for event in year_events %}

<p>
    <a href="{{ event.url }}"><date>{{ event.date | date: "%d.%m.%Y" }}</date> - {{ event.title }}</a>: <strong>{{ event.winner | default: "-" }}</strong>
{%- if event.deck -%}
    &nbsp;
    {%- if event.deck.first -%}
        {%- for winner_deck in event.deck -%}
            <a href="{{ winner_deck }}"><img src="/assets/img/trophy.svg" title="Siegerdeck {{ forloop.index }}" alt="Siegerdeck {{ forloop.index }}"><img src="/assets/img/stack.svg" title="Siegerdeck {{ forloop.index }}" alt="Siegerdeck {{ forloop.index }}"></a>
            {%- unless forloop.last -%},&nbsp;{%- endunless -%}
        {%- endfor -%}
    {%- else -%}
        <a href="{{ event.deck }}"><img src="/assets/img/trophy.svg" title="Siegerdeck" alt="Siegerdeck"><img src="/assets/img/stack.svg" title="Siegerdeck" alt="Siegerdeck"></a>
    {%- endif -%}
{%- endif -%}
</p>

{% endfor %}

{% endfor %}

&nbsp;

*Anmerkung: Unsere Gewinner werden erst seit Ende November 2023 sauber erfasst. Somit fehlen 8 Jahre Bären-Geschichte.*
