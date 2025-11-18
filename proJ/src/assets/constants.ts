import type { AllCarOptions } from "../types/carall";


export const CAR_OPTIONS: AllCarOptions = {
  lambo: {
    colors: [
      {
        name: "BLACK STEEL",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763451838/kieosqkvh4zrhevmx38l.png",
      },
      {
        name: "YELLOW",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763451868/zkdictqirbw0dptlybm7.png",
      },
    ],
    wheels: [
      {
        name: "Cheetah Carbon R",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763451902/ownvbzn5dssbeylbz9k6.png",
      },
      {
        name: "Carbon Solar",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763451934/gwcmi5kdplbfr4b1vbt4.png",
      },
    ],
    spoilers: [
      {
        name: "Super Wing",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452230/r1bg8zdfqypzqayinich.png",
      },
      {
        name: "Carbon Super Wing",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452037/a8clyhf7749wjgf6f7vg.png",
      },
    ],
    combos: [
      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452343/gu4sencuzc5jp8vn2mxa.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452409/abue0mo85x6i3kgzllrn.png" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452486/p042ic3ts0trwb0rtdo5.png" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452514/o74jcdloappvwosopocr.png" },

      { selected: { colors: "BLACK STEEL", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452654/ernslfdpwfc1q4yadlpo.png" },
      { selected: { colors: "BLACK STEEL", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452674/lwm4bmhvsgkacvszqht7.png" },
      { selected: { colors: "YELLOW", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452749/ziqfnc6qkog4lkstno2s.png" },
      { selected: { colors: "YELLOW", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452754/poxl2p69i4sgty417yzc.png" },

      { selected: { wheels: "Cheetah Carbon R", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452842/zlgb4iz2j4i7w4ggywkx.png" },
      { selected: { wheels: "Cheetah Carbon R", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452847/dudlvf4yk5nk3pgbjtv4.png" },
      { selected: { wheels: "Carbon Solar", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452893/vjnn8cyfx3ojiyrx6nft.png" },
      { selected: { wheels: "Carbon Solar", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763452899/v6ovir49vbcsp1cyijsy.png" },

      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453017/vbzui3ov0brwsl4ghesw.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453028/eukrvl13xptc5cpn5rap.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453051/cypmbzyic8igkvy6bpiq.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453058/m8mzt5jpkjb03npc86dd.png" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453100/uuornxfxjzqqkcvhsih8.png" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453108/vox4u9fa9ep2slh9oodo.png" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar", spoilers: "Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453135/yqzgmsxkhy9jghz7no61.png" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar", spoilers: "Carbon Super Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453140/h34qhlt6azeut3pvwaah.png" },
    ],
  },

  r8: {
    colors: [
      {
        name: "BLACK STEEL",
        image:
          "",
      },
      {
        name: "YELLOW",
        image:
          "",
      },
    ],
    wheels: [
      {
        name: "Cheetah Carbon R",
        image:
          "",
      },
      {
        name: "Carbon Solar",
        image:
          "",
      },
    ],
    spoilers: [
      {
        name: "Carbon XL Wing",
        image:
          "",
      },
      {
        name: "Forged XL Wing",
        image:
          "",
      },
    ],
    combos: [
      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R" }, image: "" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar" }, image: "" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R" }, image: "" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar" }, image: "" },

      { selected: { colors: "BLACK STEEL", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { colors: "BLACK STEEL", spoilers: "Forged XL Wing" }, image: "" },
      { selected: { colors: "YELLOW", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { colors: "YELLOW", spoilers: "Forged XL Wing" }, image: "" },

      { selected: { wheels: "Cheetah Carbon R", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { wheels: "Cheetah Carbon R", spoilers: "Forged XL Wing" }, image: "" },
      { selected: { wheels: "Carbon Solar", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { wheels: "Carbon Solar", spoilers: "Forged XL Wing" }, image: "" },

      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R", spoilers: "Forged XL Wing" }, image: "" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar", spoilers: "Forged XL Wing" }, image: "" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R", spoilers: "Forged XL Wing" }, image: "" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar", spoilers: "Carbon XL Wing" }, image: "" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar", spoilers: "Forged XL Wing" }, image: "" },
    ],
  },

  porche: {
    colors: [
      {
        name: "BLACK STEEL",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453421/vipmk1qkl8xswevn1czh.png",
      },
      {
        name: "YELLOW",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453350/ouzu0lzmnel6tgtomtrk.png",
      },
    ],
    wheels: [
      {
        name: "Cheetah Carbon R",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453489/g7bl2eaj24jtuhegh9oa.png",
      },
      {
        name: "Carbon Solar",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453498/ctuz8v1mkx3iqalxu0ex.png",
      },
    ],
    spoilers: [
      {
        name: "Street SPL Wing",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453620/sqo02hijkvdndpq4f6up.png",
      },
      {
        name: "Race Wing",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453624/mblj17pkej9yizres7u5.png",
      },
    ],
    combos: [
      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453712/v7i2jqampx9okgrbtvzx.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453716/bfbnte3knqwuipn6vw6y.png" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453753/wap0fojsy7vn6miqvic1.png" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453756/z2a4bwlxxi889cbmcpjo.png" },

      { selected: { colors: "BLACK STEEL", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453921/vubln4gdquw94iigf4w5.png" },
      { selected: { colors: "BLACK STEEL", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453926/zslryhadqi5i15ntjsfo.png" },
      { selected: { colors: "YELLOW", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453854/msgwoc1k5tzrybpszoai.png" },
      { selected: { colors: "YELLOW", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763453858/wxdaucg1h4m3aes8ztts.png" },

      { selected: { wheels: "Cheetah Carbon R", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454065/b0kggaxuwvae8r77vho0.png" },
      { selected: { wheels: "Cheetah Carbon R", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454068/cu9apwwkm7sjlnontplu.png" },
      { selected: { wheels: "Carbon Solar", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454136/zqb0yvs7yhe2lle1icyb.png" },
      { selected: { wheels: "Carbon Solar", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454139/uvwi9ojczb2vltdn2maa.png" },

      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454199/nlyu1e3m5kgdjx3pfds8.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Cheetah Carbon R", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454202/mxdint6jbbkld6myjbs8.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454238/ybnjsxckhkldgymfut7v.png" },
      { selected: { colors: "BLACK STEEL", wheels: "Carbon Solar", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454241/s2xalhseyxcjiawwot2s.png" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454284/x5roeguzybdaioj7dz7p.png" },
      { selected: { colors: "YELLOW", wheels: "Cheetah Carbon R", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454280/pebmeykdfgpqe1yy2qie.png" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar", spoilers: "Street SPL Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454345/gmjgtobhfrsnmrpgqeuw.png" },
      { selected: { colors: "YELLOW", wheels: "Carbon Solar", spoilers: "Race Wing" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1763454341/uru5xrbpel0yczqbijub.png" },
    ],
  },
};