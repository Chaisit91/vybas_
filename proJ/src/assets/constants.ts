import type { Car, AllCarOptions } from "../types/carall";

export const CARS: Car[] = [
  {
    id: 1,
    name: "TEMERARIO",
    tagline: "YOU CAN'T HIDE WHO YOU ARE",
    image:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762255477/wz2xf2spfqg7efsana9n.png",
    sideLeft:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395957/ilvtm6oam4hzqib0p3gh.png",
    sideRight:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395752/v5154th8rt4zdoalubuc.png",
    specs: "",
    publicId: "temerario",
  },
  {
    id: 2,
    name: "REVUELTO",
    tagline: "THE FUTURE OF SUPERCARS",
    image:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395752/v5154th8rt4zdoalubuc.png",
    sideLeft:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395957/ilvtm6oam4hzqib0p3gh.png",
    sideRight:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395835/x34ypvkld6aiohybzn3d.png",
    specs: "",
    publicId: "revuelto",
  },
  {
    id: 3,
    name: "RES",
    tagline: "THE FUTURE OF SUPERCARS",
    image:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395957/ilvtm6oam4hzqib0p3gh.png",
    sideLeft:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395752/v5154th8rt4zdoalubuc.png",
    sideRight:
      "https://res.cloudinary.com/dlp0q39ua/image/upload/v1761395835/x34ypvkld6aiohybzn3d.png",
    specs: "",
    publicId: "res",
  },
];

export const CAR_OPTIONS: AllCarOptions = {
  temerario: {
    colors: [
      {
        name: "Crimson Red",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762261344/mquloewpcwif3d7skbzs.png",
      },
      {
        name: "Shadow Black",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509540/uiwpvyjfnytq44kz5lme.png",
      },
    ],
    wheels: [
      {
        name: "Vortex",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png",
      },
      {
        name: "Carbon X",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509485/mpuscr4xpst8zyakowwl.png",
      },
    ],
    spoilers: [
      {
        name: "Sport",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509429/s5hlwvufhkvmqztoavcx.png",
      },
      {
        name: "GT",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png",
      },
    ],
    combos: [
      { selected: { colors: "Crimson Red", wheels: "Vortex" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },
      { selected: { colors: "Shadow Black", wheels: "Vortex" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },

      { selected: { colors: "Crimson Red", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Crimson Red", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },
      { selected: { colors: "Shadow Black", spoilers: "Sport" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png" },
      { selected: { colors: "Shadow Black", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },

      { selected: { wheels: "Vortex", spoilers: "Sport" }, image: "" },
      { selected: { wheels: "Vortex", spoilers: "GT" }, image: "" },
      { selected: { wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { wheels: "Carbon X", spoilers: "GT" }, image: "" },

      { selected: { colors: "Crimson Red", wheels: "Vortex", spoilers: "Sport" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },
      { selected: { colors: "Crimson Red", wheels: "Vortex", spoilers: "GT" }, image: "" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },
      { selected: { colors: "Shadow Black", wheels: "Vortex", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Shadow Black", wheels: "Vortex", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X", spoilers: "Sport" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762255477/wz2xf2spfqg7efsana9n.png" },
    ],
  },

  revuelto: {
    colors: [
      {
        name: "Crimson Red",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762261344/mquloewpcwif3d7skbzs.png",
      },
      {
        name: "Shadow Black",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509540/uiwpvyjfnytq44kz5lme.png",
      },
    ],
    wheels: [
      {
        name: "Vortex",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png",
      },
      {
        name: "Carbon X",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509485/mpuscr4xpst8zyakowwl.png",
      },
    ],
    spoilers: [
      {
        name: "Sport",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509429/s5hlwvufhkvmqztoavcx.png",
      },
      {
        name: "GT",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png",
      },
    ],
    combos: [
      { selected: { colors: "Crimson Red", wheels: "Vortex" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },
      { selected: { colors: "Shadow Black", wheels: "Vortex" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },

      { selected: { colors: "Crimson Red", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Crimson Red", spoilers: "GT" }, image: "" },
      { selected: { colors: "Shadow Black", spoilers: "Sport" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png" },
      { selected: { colors: "Shadow Black", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },

      { selected: { wheels: "Vortex", spoilers: "Sport" }, image: "" },
      { selected: { wheels: "Vortex", spoilers: "GT" }, image: "" },
      { selected: { wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { wheels: "Carbon X", spoilers: "GT" }, image: "" },

      { selected: { colors: "Crimson Red", wheels: "Vortex", spoilers: "Sport" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },
      { selected: { colors: "Crimson Red", wheels: "Vortex", spoilers: "GT" }, image: "" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X", spoilers: "GT" }, image: "" },
      { selected: { colors: "Shadow Black", wheels: "Vortex", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Shadow Black", wheels: "Vortex", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X", spoilers: "GT" }, image: "" },
    ],
  },

  res: {
    colors: [
      {
        name: "Crimson Red",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762261344/mquloewpcwif3d7skbzs.png",
      },
      {
        name: "Shadow Black",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509540/uiwpvyjfnytq44kz5lme.png",
      },
    ],
    wheels: [
      {
        name: "Vortex",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png",
      },
      {
        name: "Carbon X",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509485/mpuscr4xpst8zyakowwl.png",
      },
    ],
    spoilers: [
      {
        name: "Sport",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509429/s5hlwvufhkvmqztoavcx.png",
      },
      {
        name: "GT",
        image:
          "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png",
      },
    ],
    combos: [
      { selected: { colors: "Crimson Red", wheels: "Vortex" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },
      { selected: { colors: "Shadow Black", wheels: "Vortex" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },

      { selected: { colors: "Crimson Red", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Crimson Red", spoilers: "GT" }, image: "" },
      { selected: { colors: "Shadow Black", spoilers: "Sport" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762509458/u1ik2mpn4hsji2vssyx1.png" },
      { selected: { colors: "Shadow Black", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },

      { selected: { wheels: "Vortex", spoilers: "Sport" }, image: "" },
      { selected: { wheels: "Vortex", spoilers: "GT" }, image: "" },
      { selected: { wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { wheels: "Carbon X", spoilers: "GT" }, image: "" },

      { selected: { colors: "Crimson Red", wheels: "Vortex", spoilers: "Sport" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762452163/gdlnphebebxt0pk2il0q.png" },
      { selected: { colors: "Crimson Red", wheels: "Vortex", spoilers: "GT" }, image: "" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Crimson Red", wheels: "Carbon X", spoilers: "GT" }, image: "" },
      { selected: { colors: "Shadow Black", wheels: "Vortex", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Shadow Black", wheels: "Vortex", spoilers: "GT" }, image: "https://res.cloudinary.com/dlp0q39ua/image/upload/v1762508537/xng9gtix0d1yu3rery5u.png" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X", spoilers: "Sport" }, image: "" },
      { selected: { colors: "Shadow Black", wheels: "Carbon X", spoilers: "GT" }, image: "" },
    ],
  },
};
