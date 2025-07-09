const theme = {}

theme.themeStatusActive = "ACTIVE";
theme.themeStatusInactive = "INACTIVE";
theme.themeStatusDeleted = "DELETED";

theme.themeStatusList = ["ACTIVE", "INACTIVE", "DELETED"];
theme.invalidthemeStatusListMsg = "Please choose one of the following status: Active, Inactive, Deleted";
theme.themeStatusNameList = {
    ACTIVE: "Active",
    INACTIVE: "Inactive",
    DELETED: "Deleted"
};

module.exports = theme;