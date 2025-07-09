const ThemeModel = require("../models/masters/theme/theme.model");

const theme = [
    {
        title: "Theme-1",
        backgroundColor: "#FBEED5",
        textColor: "#000000",
        buttonColor: "#003459",
        buttonTextColor: "#FFFFFF",
        iconColor: "#B88E2F",
        isApplied: true,
        status: 'ACTIVE'
    },
    {
        title: "Theme-2",
        backgroundColor: "#E2FFC9",
        textColor: "#000000",
        buttonColor: "#005710",
        buttonTextColor: "#FFFFFF",
        iconColor: "#005710",
        isApplied: false,
        status: 'ACTIVE'
    },
    {
        title: "Theme-3",
        backgroundColor: "#FFEFFA",
        textColor: "#000000",
        buttonColor: "#7D1D5A",
        buttonTextColor: "#FFFFFF",
        iconColor: "#7D1D5A",
        isApplied: false,
        status: 'ACTIVE'
    },
    {
        title: "Theme-4",
        backgroundColor: "#EDF0F5",
        textColor: "#000000",
        buttonColor: "#FF5338",
        buttonTextColor: "#FFFFFF",
        iconColor: "#FF5338",
        isApplied: false,
        status: 'ACTIVE'
    },
    {
        title: "Theme-5",
        backgroundColor: "#B0D1F0",
        textColor: "#000000",
        buttonColor: "#0162A7",
        buttonTextColor: "#FFFFFF",
        iconColor: "#0162A7",
        isApplied: false,
        status: 'ACTIVE'
    },
    {
        title: "Theme-6",
        backgroundColor: "#DAB8EF",
        textColor: "#000000",
        buttonColor: "#7C2CB1",
        buttonTextColor: "#FFFFFF",
        iconColor: "#7C2CB1",
        isApplied: false,
        status: 'ACTIVE'
    }
];

const seedTheme = async ()=>{
    try{
        await ThemeModel.deleteMany({});
        await ThemeModel.insertMany(theme);
    }
    catch(err){
        console.log(err);
    }
}
module.exports = seedTheme;