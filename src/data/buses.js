const base = (import.meta && import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/';

const buses = [
    {
        id: "vdl-citea-lle-120",
        manufacturer: "VDL",
        model: "Citea LLE-120",
        image: `${base}images/buses/citea-lle-120.jpg`,
    },
    {
        id: "mercedes-citaro-c2",
        manufacturer: "Mercedes-Benz",
        model: "Citaro C2",
        image: `${base}images/buses/citaro-c2.jpg`,
    },
    {
        id: "solaris-urbino-12-electric",
        manufacturer: "Solaris",
        model: "Urbino 12 electric",
        image: `${base}images/buses/urbino-12-electric.jpg`,
    },
    {
        id: "mercedes-ecitaro",
        manufacturer: "Mercedes-Benz",
        model: "eCitaro",
        image: `${base}images/buses/ecitaro.jpg`,
    },
    {
        id: "ebusco-2-2",
        manufacturer: "Ebusco",
        model: "Ebusco 2.2",
        image: `${base}images/buses/ebusco-2-2.jpg`,
    },
];

export default buses;
