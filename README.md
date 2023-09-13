# 🛣️ Roadside Explorer

**https://roadside-explorer.pages.dev/**

日本国内のロードサイド店舗・大規模商業施設の集まる地域を推定し、地図上に描画します。

![RoadsideExplorer](https://github.com/TadaTeruki/roadside-explorer/assets/69315285/907fafee-2ac0-4666-9280-e8a5ef8ac162)

開発環境: Vite+React+TypeScript

## 抽出データについて


[Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)を用いて、以下のようなクエリに基づいてロードサイド店舗を抽出しています:

1. 日本国内の建築物である

2. 属性`amenity=*`または`shop=*`を持ち、紐付けられた店の種類がロードサイドに多いものとして以下のリスト中に存在している
```
amenity=fast_food | amenity=pharmacy | shop=car | shop=supermarket | shop=bakery | shop=hairdresser | amenity=cafe | amenity=restaurant | shop=beauty | shop=clothes | shop=alcohol | shop=butcher | shop=electronics | amenity=bakery | amenity=bank | shop=hardware | shop=jewelry | amenity=clinic | shop=shoes | shop=florist | shop=mobile_phone | shop=optician | shop=toys | shop=furniture | shop=bookstore | amenity=bar | shop=bicycle | shop=sports | shop=stationery | shop=department_store | shop=mall
```

3. 属性`brand=*`を持つ (`shop=mall`等、大規模商業施設は例外)

これに基づいて作成されたOverpassのクエリは、[gistとして共有しています](https://gist.github.com/TadaTeruki/db136753c7d10d95b0019c2a6ece32cd)。

## 注意事項

本ソフトウェアでは[OpenStreetMap](https://www.openstreetmap.org)の地図データを使用しています。OSMのデータは世界中のボランティアによって提供・編集されている共同プロジェクトのため、現実の地理的な情報とは多少の誤差が生じる可能性があります。

## 謝辞

この地図は[MIERUNE Inc.](https://www.mierune.co.jp/)インターンシップにて、成果物として開発したものです。開発の援助やデータ作成など幅広く貢献いただいた[井口奏大](https://github.com/Kanahiro)氏をはじめ、MIERUNE Inc.の皆様に様々なご協力を承りました。
