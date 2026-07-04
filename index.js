// src/index.jsx
import { storage } from "@vendetta/plugin";
import { after } from "@vendetta/patcher";
import { findByStoreName, findByProps } from "@vendetta/metro";
import { React, ReactNative, stylesheet } from "@vendetta/metro/common";
import { useProxy } from "@vendetta/storage";
import { Forms } from "@vendetta/ui/components";
import { showToast } from "@vendetta/ui/toasts";
import { semanticColors } from "@vendetta/ui";
var {
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Clipboard,
  Alert,
  Switch
} = ReactNative;
var { FormSection, FormRow, FormSwitch, FormDivider } = Forms;
var BADGES_CATALOG = {
  STAFF: { id: "staff", description: "Discord Staff", icon: "5e74e9b61934fc1f67c65515d1f7e60d", link: "https://discord.com/company" },
  PARTNER: { id: "partner", description: "Partnered Server Owner", icon: "3f9748e53446a137a052f3454e2de41e", link: "https://discord.com/partners" },
  CERTIFIED_MODERATOR: { id: "certified_moderator", description: "Moderator Programs Alumni", icon: "fee1624003e2fee35cb398e125dc479b", link: "https://discord.com/safety" },
  BUG_HUNTER_LVL1: { id: "bug_hunter_level_1", description: "Discord Bug Hunter", icon: "2717692c7dca7289b35297368a940dd0", link: "https://support.discord.com/hc/en-us/articles/360046057772-Discord-Bugs" },
  BUG_HUNTER_LVL2: { id: "bug_hunter_level_2", description: "Discord Bug Hunter", icon: "848f79194d4be5ff5f81505cbd0ce1e6", link: "https://support.discord.com/hc/en-us/articles/360046057772-Discord-Bugs" },
  VERIFIED_DEVELOPER: { id: "verified_developer", description: "Early Verified Bot Developer", icon: "6df5892e0f35b051f8b61eace34f4967" },
  EARLY_SUPPORTER: { id: "early_supporter", description: "Early Supporter", icon: "7060786766c9c840eb3019e725d2b358", link: "https://discord.com/settings/premium" },
  LEGACY_USERNAME: { id: "legacy_username", description: "Legacy Username", icon: "6de6d34650760ba5551a79732e98ed60" },
  HYPESQUAD: { id: "hypesquad", description: "HypeSquad Events", icon: "bf01d1073931f921909045f3a39fd264" },
  HYPESQUAD_BRAVERY: { id: "hypesquad_house_1", description: "HypeSquad Bravery", icon: "8a88d63823d8a71cd5e390baa45efa02" },
  HYPESQUAD_BRILLIANCE: { id: "hypesquad_house_2", description: "HypeSquad Brilliance", icon: "011940fd013da3f7fb926e4a1cd2e618" },
  HYPESQUAD_BALANCE: { id: "hypesquad_house_3", description: "HypeSquad Balance", icon: "3aa41de486fa12454c3761e8e223442e" },
  NITRO: { id: "premium", description: "Nitro Subscriber", icon: "2ba85e8026a8614b640c2837bcdfe21b", link: "https://discord.com/settings/premium" },
  NITRO_6_MONTHS: { id: "premium_tenure_6_month_v2", description: "Nitro 6 Months", icon: "2895086c18d5531d499862e41d1155a6", link: "https://discord.com/settings/premium" },
  NITRO_12_MONTHS: { id: "premium_tenure_12_month_v2", description: "Nitro 12 Months", icon: "0334688279c8359068335dbe68b4fb8", link: "https://discord.com/settings/premium" },
  NITRO_24_MONTHS: { id: "premium_tenure_24_month_v2", description: "Nitro 24 Months", icon: "0d61871f72bb9a33a7ae568c1fb4f20a", link: "https://discord.com/settings/premium" },
  NITRO_36_MONTHS: { id: "premium_tenure_36_month_v2", description: "Nitro 36 Months", icon: "11e2d339068b55d3a506cff34d3780f3", link: "https://discord.com/settings/premium" },
  NITRO_60_MONTHS: { id: "premium_tenure_60_month_v2", description: "Nitro 60 Months", icon: "cd5e2cfd9d7f27a8cdcd3e8a8d5dc9f4", link: "https://discord.com/settings/premium" },
  NITRO_72_MONTHS: { id: "premium_tenure_72_month_v2", description: "Nitro 72 Months", icon: "5b154df19c53dce2af92c9b61e6be5e2", link: "https://discord.com/settings/premium" },
  BOOSTER_LVL1: { id: "guild_booster_lvl1", description: "Server Booster Level 1", icon: "51040c70d4f20a921ad6674ff86fc95c", link: "https://discord.com/settings/guild-boosting" },
  BOOSTER_LVL2: { id: "guild_booster_lvl2", description: "Server Booster Level 2", icon: "0e4080d1d333bc7ad29ef6528b6f2fb7", link: "https://discord.com/settings/guild-boosting" },
  BOOSTER_LVL3: { id: "guild_booster_lvl3", description: "Server Booster Level 3", icon: "72bed924410c304dbe3d00a6e593ff59", link: "https://discord.com/settings/guild-boosting" },
  BOOSTER_LVL5: { id: "guild_booster_lvl5", description: "Server Booster Level 5", icon: "996b3e870e8a22ce519b3a50e6bdd52f", link: "https://discord.com/settings/guild-boosting" },
  BOOSTER_LVL9: { id: "guild_booster_lvl9", description: "Server Booster Level 9", icon: "ec92202290b48d0879b7413d2dde3bab", link: "https://discord.com/settings/guild-boosting" },
  QUEST_COMPLETED: { id: "quest_completed", description: "Completed a Quest", icon: "7d9ae358c8c5e118768335dbe68b4fb8", link: "https://discord.com/discovery/quests" },
  ORB_PROFILE: { id: "orb_profile_badge", description: "Collected the Orb Profile Badge", icon: "83d8a1eb09a8d64e59233eec5d4d5c2d" },
  APRIL_FOOLS_2026: { id: "april_fools_2026", description: "Level 100 Reached", icon: "ca105ad9cfc8580c765101d17bbb2323" }
};
var BADGE_ORDER = [
  "staff",
  "partner",
  "certified_moderator",
  "hypesquad",
  "hypesquad_house_1",
  "hypesquad_house_2",
  "hypesquad_house_3",
  "bug_hunter_level_1",
  "bug_hunter_level_2",
  "verified_developer",
  "early_supporter",
  "legacy_username",
  "premium",
  "premium_tenure_6_month_v2",
  "premium_tenure_12_month_v2",
  "premium_tenure_24_month_v2",
  "premium_tenure_36_month_v2",
  "premium_tenure_60_month_v2",
  "premium_tenure_72_month_v2",
  "guild_booster_lvl1",
  "guild_booster_lvl2",
  "guild_booster_lvl3",
  "guild_booster_lvl5",
  "guild_booster_lvl9",
  "quest_completed",
  "orb_profile_badge",
  "april_fools_2026"
];
var styles = stylesheet.createThemedStyleSheet({
  container: { flex: 1, backgroundColor: semanticColors.BACKGROUND_PRIMARY },
  section: { marginBottom: 16 },
  sectionTitle: { color: semanticColors.HEADER_SECONDARY, fontSize: 12, fontWeight: "700", textTransform: "uppercase", paddingHorizontal: 16, paddingVertical: 8, letterSpacing: 0.5 },
  card: { backgroundColor: semanticColors.BACKGROUND_SECONDARY, marginHorizontal: 12, borderRadius: 12, padding: 14, marginBottom: 10 },
  cardTitle: { color: semanticColors.TEXT_NORMAL, fontSize: 16, fontWeight: "700", marginBottom: 6 },
  cardDesc: { color: semanticColors.TEXT_MUTED, fontSize: 12, marginBottom: 10, lineHeight: 16 },
  input: { backgroundColor: semanticColors.BACKGROUND_TERTIARY, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10, color: semanticColors.TEXT_NORMAL, fontSize: 14, marginBottom: 10, borderWidth: 1, borderColor: semanticColors.BACKGROUND_MODIFIER_ACCENT },
  inputLabel: { color: semanticColors.HEADER_SECONDARY, fontSize: 12, fontWeight: "600", marginBottom: 4, textTransform: "uppercase" },
  previewCard: { backgroundColor: "#111214", borderRadius: 12, padding: 0, marginHorizontal: 12, marginBottom: 12, overflow: "hidden" },
  previewBanner: { height: 70, backgroundColor: "#5865f2" },
  previewBody: { paddingHorizontal: 14, paddingBottom: 14 },
  previewAvatarRow: { flexDirection: "row", alignItems: "flex-end", marginTop: -28, marginBottom: 10 },
  previewAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#36393f", borderWidth: 4, borderColor: "#111214" },
  previewDecoration: { position: "absolute", top: -8, left: -8, width: 80, height: 80 },
  previewName: { color: "#ffffff", fontSize: 18, fontWeight: "700" },
  previewUsername: { color: "#b5bac1", fontSize: 13 },
  previewBadgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginBottom: 8 },
  previewBadge: { width: 20, height: 20 },
  previewInfo: { color: "#72767d", fontSize: 12, marginTop: 2 },
  badgeRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8 },
  badgeIcon: { width: 24, height: 24, marginRight: 10 },
  badgeText: { color: semanticColors.TEXT_NORMAL, fontSize: 14, flex: 1 },
  buttonRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginHorizontal: 12, marginBottom: 12 },
  button: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  buttonText: { color: "#ffffff", fontSize: 13, fontWeight: "600" },
  presetRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
  presetBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  presetBtnText: { color: "#ffffff", fontSize: 12, fontWeight: "500" },
  decGrid: { flexDirection: "row", flexWrap: "wrap", paddingHorizontal: 12, gap: 8, marginBottom: 12 },
  decCard: { borderRadius: 10, padding: 8, alignItems: "center", width: 90, borderWidth: 2 },
  decImage: { width: 56, height: 56, marginBottom: 4 },
  decName: { color: "#ffffff", fontSize: 10, textAlign: "center" },
  npCard: { borderRadius: 10, padding: 10, marginHorizontal: 12, marginBottom: 6, flexDirection: "row", alignItems: "center", overflow: "hidden", borderWidth: 2, minHeight: 50 },
  npBg: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.5 },
  npName: { color: "#ffffff", fontSize: 13, fontWeight: "500", flex: 1, textShadowColor: "rgba(0,0,0,0.8)", textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 2 },
  deleteBtn: { backgroundColor: "rgba(218,55,60,0.8)", width: 28, height: 28, borderRadius: 6, alignItems: "center", justifyContent: "center" },
  deleteBtnText: { color: "#ffffff", fontSize: 18, fontWeight: "700", lineHeight: 20 },
  searchInput: { backgroundColor: semanticColors.BACKGROUND_TERTIARY, borderRadius: 8, paddingHorizontal: 14, paddingVertical: 8, color: semanticColors.TEXT_NORMAL, fontSize: 13, marginHorizontal: 12, marginBottom: 8, borderWidth: 1, borderColor: semanticColors.BACKGROUND_MODIFIER_ACCENT },
  statusText: { color: semanticColors.TEXT_MUTED, fontSize: 12, marginHorizontal: 14, marginTop: 4, marginBottom: 8 },
  countBadge: { backgroundColor: "#5865f2", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8 },
  countBadgeText: { color: "#ffffff", fontSize: 11, fontWeight: "700" },
  warningText: { color: "#f0b232", fontSize: 12, marginHorizontal: 14, marginBottom: 8 },
  idText: { color: semanticColors.TEXT_MUTED, fontSize: 12, marginHorizontal: 14, marginBottom: 4 }
});
var patches = [];
var captureInterval = null;
var userId = null;
var realBadges = [];
function sortBadges(badges) {
  return badges.slice().sort((a, b) => {
    const ia = BADGE_ORDER.indexOf(a.id);
    const ib = BADGE_ORDER.indexOf(b.id);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });
}
function prettyNameplateName(src) {
  try {
    const parts = src.split("/").filter(Boolean);
    const last = parts[parts.length - 1];
    if (!last || /^\d+$/.test(last)) return null;
    return last.split("_").join(" ");
  } catch {
    return null;
  }
}
function modifyUser(user) {
  if (storage.displayName) user.globalName = storage.displayName;
  if (storage.username) user.username = storage.username;
  if (storage.fakeCreatedAt) {
    try {
      const fakeDate = new Date(storage.fakeCreatedAt);
      if (!isNaN(fakeDate.getTime())) {
        const discordEpoch = 1420070400000n;
        const timestamp = BigInt(fakeDate.getTime()) - discordEpoch;
        const fakeSnowflake = (timestamp << 22n).toString();
        Object.defineProperty(user, "createdAt", {
          get: () => fakeDate,
          configurable: true
        });
        if (user.id === userId) {
          user._realId = user._realId || user.id;
        }
      }
    } catch (e) {
    }
  }
  if (storage.decoration && storage.capturedDecorations?.[storage.decoration]) {
    const dec = storage.capturedDecorations[storage.decoration];
    user.avatarDecorationData = {
      skuId: dec.skuId,
      asset: dec.asset,
      expiresAt: null
    };
  }
  if (storage.nameplate && storage.capturedNameplates?.[storage.nameplate]) {
    const np = storage.capturedNameplates[storage.nameplate];
    const nameplateData = {
      skuId: np.skuId,
      src: np.src,
      asset: np.asset,
      palette: np.palette,
      expiresAt: null
    };
    user.collectibles = user.collectibles || {};
    user.collectibles.nameplate = nameplateData;
    user.nameplate = nameplateData;
  }
}
function runCapture(UserStore) {
  try {
    const users = Object.values(UserStore.getUsers());
    let nd = 0, nn = 0;
    for (const u of users) {
      const dec = u.avatarDecorationData;
      if (dec?.skuId && dec?.asset && !storage.capturedDecorations[dec.skuId]) {
        storage.capturedDecorations[dec.skuId] = {
          skuId: dec.skuId,
          asset: dec.asset,
          name: `decoration ${Object.keys(storage.capturedDecorations).length + 1}`
        };
        nd++;
      }
      const np = u.collectibles?.nameplate || u.nameplate;
      if (np?.skuId && np?.src && !storage.capturedNameplates[np.skuId]) {
        const niceName = prettyNameplateName(np.src);
        storage.capturedNameplates[np.skuId] = {
          skuId: np.skuId,
          src: np.src,
          asset: np.asset || null,
          palette: np.palette || null,
          name: niceName || `nameplate ${Object.keys(storage.capturedNameplates).length + 1}`
        };
        nn++;
      }
    }
    if (nd > 0 || nn > 0) {
      console.log(`[MultiLarpingTool] +${nd} decorations, +${nn} nameplates snagged`);
    }
    return { nd, nn };
  } catch (e) {
    console.error("[MultiLarpingTool] capture error:", e);
    return { nd: 0, nn: 0 };
  }
}
async function captureFromUserId(targetId) {
  try {
    const UserStore = findByStoreName("UserStore");
    let user = UserStore.getUser(targetId);
    if (!user) {
      try {
        const UserProfileActions = findByProps("fetchProfile");
        if (UserProfileActions) {
          await UserProfileActions.fetchProfile(targetId);
          await new Promise((r) => setTimeout(r, 1e3));
          user = UserStore.getUser(targetId);
        }
      } catch (e) {
        console.error("[MultiLarpingTool] fetch failed:", e);
      }
    }
    if (!user) {
      return { success: false, message: "couldn't find that user lol. try opening their profile first" };
    }
    let nd = 0, nn = 0;
    const dec = user.avatarDecorationData;
    if (dec?.skuId && dec?.asset && !storage.capturedDecorations[dec.skuId]) {
      storage.capturedDecorations[dec.skuId] = {
        skuId: dec.skuId,
        asset: dec.asset,
        name: `snagged from ${user.username || targetId}`
      };
      nd++;
    }
    const np = user.collectibles?.nameplate || user.nameplate;
    if (np?.skuId && np?.src && !storage.capturedNameplates[np.skuId]) {
      const niceName = prettyNameplateName(np.src);
      storage.capturedNameplates[np.skuId] = {
        skuId: np.skuId,
        src: np.src,
        asset: np.asset || null,
        palette: np.palette || null,
        name: niceName || `snagged from ${user.username || targetId}`
      };
      nn++;
    }
    return {
      success: true,
      message: `snagged from ${user.username || targetId}: +${nd} decorations, +${nn} nameplates${nd + nn === 0 ? " (already had em all lol)" : " gz"}`
    };
  } catch (e) {
    console.error("[MultiLarpingTool] capture from id error:", e);
    return { success: false, message: "something broke lol check console" };
  }
}
function Preview() {
  useProxy(storage);
  const activeBadgeKeys = storage.activeBadges || [];
  const visibleReal = (realBadges || []).filter((b) => !(storage.hiddenBadges || []).includes(b.id));
  const allBadgeIcons = [];
  for (const b of visibleReal) allBadgeIcons.push(b.icon);
  for (const key of activeBadgeKeys) {
    const cat = BADGES_CATALOG[key];
    if (cat && !allBadgeIcons.includes(cat.icon)) allBadgeIcons.push(cat.icon);
  }
  let avatarUri = null;
  try {
    const UserStore = findByStoreName("UserStore");
    const user = UserStore.getCurrentUser();
    if (user?.avatar) {
      const ext = user.avatar.startsWith("a_") ? "gif" : "png";
      avatarUri = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=128`;
    }
  } catch {
  }
  const hasNameplate = storage.nameplate && storage.capturedNameplates?.[storage.nameplate];
  const hasDec = storage.decoration && storage.capturedDecorations?.[storage.decoration];
  return /* @__PURE__ */ React.createElement(View, { style: styles.previewCard }, hasNameplate ? /* @__PURE__ */ React.createElement(
    Image,
    {
      source: { uri: `https://cdn.discordapp.com/assets/collectibles/${storage.capturedNameplates[storage.nameplate].src}static.png` },
      style: [styles.previewBanner, { resizeMode: "cover" }]
    }
  ) : /* @__PURE__ */ React.createElement(View, { style: styles.previewBanner }), /* @__PURE__ */ React.createElement(View, { style: styles.previewBody }, /* @__PURE__ */ React.createElement(View, { style: styles.previewAvatarRow }, /* @__PURE__ */ React.createElement(View, { style: { position: "relative" } }, avatarUri ? /* @__PURE__ */ React.createElement(Image, { source: { uri: avatarUri }, style: styles.previewAvatar }) : /* @__PURE__ */ React.createElement(View, { style: [styles.previewAvatar, { alignItems: "center", justifyContent: "center" }] }, /* @__PURE__ */ React.createElement(Text, { style: { fontSize: 28 } }, "\u{1F464}")), hasDec && /* @__PURE__ */ React.createElement(
    Image,
    {
      source: { uri: `https://cdn.discordapp.com/avatar-decoration-presets/${storage.capturedDecorations[storage.decoration].asset}.png?size=128&passthrough=true` },
      style: styles.previewDecoration
    }
  )), /* @__PURE__ */ React.createElement(View, { style: { marginLeft: 10, paddingBottom: 4 } }, /* @__PURE__ */ React.createElement(Text, { style: styles.previewName }, storage.displayName || "your display name"), /* @__PURE__ */ React.createElement(Text, { style: styles.previewUsername }, storage.username ? `@${storage.username}` : "@username"))), allBadgeIcons.length > 0 && /* @__PURE__ */ React.createElement(View, { style: styles.previewBadgeRow }, allBadgeIcons.map((icon, i) => /* @__PURE__ */ React.createElement(Image, { key: i, source: { uri: `https://cdn.discordapp.com/badge-icons/${icon}.png` }, style: styles.previewBadge }))), /* @__PURE__ */ React.createElement(Text, { style: styles.previewInfo }, storage.fakeCreatedAt ? `\u{1F4C5} member since ${new Date(storage.fakeCreatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}` : "\u{1F4C5} member since (original date)"), /* @__PURE__ */ React.createElement(Text, { style: styles.previewInfo }, `\u{1F465} ${storage.fakeMutualFriends || "?"} mutual friends \xB7 \u{1F3E0} ${storage.fakeMutualGuilds || "?"} mutual servers`)));
}
function DecorationPicker() {
  useProxy(storage);
  const [search, setSearch] = React.useState("");
  const entries = Object.entries(storage.capturedDecorations || {});
  const filtered = search ? entries.filter(([, d]) => (d.name || "").toLowerCase().includes(search.toLowerCase())) : entries;
  const screenW = Dimensions.get("window").width;
  const cardW = Math.floor((screenW - 24 - 24) / 3);
  return /* @__PURE__ */ React.createElement(View, null, /* @__PURE__ */ React.createElement(View, { style: styles.card }, /* @__PURE__ */ React.createElement(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Text, { style: styles.cardTitle }, "\u{1F3A8} avatar decoration"), /* @__PURE__ */ React.createElement(View, { style: styles.countBadge }, /* @__PURE__ */ React.createElement(Text, { style: styles.countBadgeText }, entries.length))), /* @__PURE__ */ React.createElement(Text, { style: styles.cardDesc }, "tap to equip, long press to delete")), entries.length > 8 && /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.searchInput,
      placeholder: "\u{1F50D} search decorations...",
      placeholderTextColor: "#72767d",
      value: search,
      onChangeText: setSearch
    }
  ), /* @__PURE__ */ React.createElement(View, { style: styles.decGrid }, /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      style: [styles.decCard, {
        width: cardW,
        backgroundColor: storage.decoration === "" ? "#5865f2" : "#2b2d31",
        borderColor: storage.decoration === "" ? "#5865f2" : "#1e1f22"
      }],
      onPress: () => {
        storage.decoration = "";
      }
    },
    /* @__PURE__ */ React.createElement(Text, { style: { fontSize: 28, marginBottom: 4 } }, "\u274C"),
    /* @__PURE__ */ React.createElement(Text, { style: styles.decName }, "none")
  ), filtered.map(([skuId, dec]) => /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      key: skuId,
      style: [styles.decCard, {
        width: cardW,
        backgroundColor: storage.decoration === skuId ? "#5865f2" : "#2b2d31",
        borderColor: storage.decoration === skuId ? "#5865f2" : "#1e1f22"
      }],
      onPress: () => {
        storage.decoration = skuId;
      },
      onLongPress: () => {
        Alert.alert("delete", `delete ${dec.name}?`, [
          { text: "nah", style: "cancel" },
          { text: "yep", style: "destructive", onPress: () => {
            delete storage.capturedDecorations[skuId];
            if (storage.decoration === skuId) storage.decoration = "";
          } }
        ]);
      }
    },
    /* @__PURE__ */ React.createElement(
      Image,
      {
        source: { uri: `https://cdn.discordapp.com/avatar-decoration-presets/${dec.asset}.png?size=96&passthrough=true` },
        style: styles.decImage
      }
    ),
    /* @__PURE__ */ React.createElement(Text, { style: styles.decName, numberOfLines: 2 }, dec.name)
  ))), /* @__PURE__ */ React.createElement(View, { style: styles.buttonRow }, /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      style: [styles.button, { backgroundColor: "#da373c" }],
      onPress: () => {
        Alert.alert("clear all", "delete ALL decorations? no undo lol", [
          { text: "nah", style: "cancel" },
          { text: "yep", style: "destructive", onPress: () => {
            storage.capturedDecorations = {};
            storage.decoration = "";
          } }
        ]);
      }
    },
    /* @__PURE__ */ React.createElement(Text, { style: styles.buttonText }, "\u{1F5D1}\uFE0F clear all")
  )));
}
function NameplatePicker() {
  useProxy(storage);
  const [search, setSearch] = React.useState("");
  const entries = Object.entries(storage.capturedNameplates || {});
  const filtered = search ? entries.filter(([, np]) => (np.name || "").toLowerCase().includes(search.toLowerCase())) : entries;
  return /* @__PURE__ */ React.createElement(View, null, /* @__PURE__ */ React.createElement(View, { style: styles.card }, /* @__PURE__ */ React.createElement(View, { style: { flexDirection: "row", alignItems: "center", marginBottom: 6 } }, /* @__PURE__ */ React.createElement(Text, { style: styles.cardTitle }, "\u{1FAAA} nameplate"), /* @__PURE__ */ React.createElement(View, { style: styles.countBadge }, /* @__PURE__ */ React.createElement(Text, { style: styles.countBadgeText }, entries.length))), /* @__PURE__ */ React.createElement(Text, { style: styles.cardDesc }, "tap to equip, long press to delete")), entries.length > 8 && /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.searchInput,
      placeholder: "\u{1F50D} search nameplates...",
      placeholderTextColor: "#72767d",
      value: search,
      onChangeText: setSearch
    }
  ), /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      style: [styles.npCard, {
        backgroundColor: storage.nameplate === "" ? "#5865f2" : "#2b2d31",
        borderColor: storage.nameplate === "" ? "#5865f2" : "#1e1f22"
      }],
      onPress: () => {
        storage.nameplate = "";
      }
    },
    /* @__PURE__ */ React.createElement(Text, { style: styles.npName }, "\u274C none")
  ), filtered.map(([skuId, np]) => /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      key: skuId,
      style: [styles.npCard, {
        backgroundColor: storage.nameplate === skuId ? "#5865f2" : "#2b2d31",
        borderColor: storage.nameplate === skuId ? "#5865f2" : "#1e1f22"
      }],
      onPress: () => {
        storage.nameplate = skuId;
      },
      onLongPress: () => {
        Alert.alert("delete", `delete ${np.name}?`, [
          { text: "nah", style: "cancel" },
          { text: "yep", style: "destructive", onPress: () => {
            delete storage.capturedNameplates[skuId];
            if (storage.nameplate === skuId) storage.nameplate = "";
          } }
        ]);
      }
    },
    np.src && /* @__PURE__ */ React.createElement(
      Image,
      {
        source: { uri: `https://cdn.discordapp.com/assets/collectibles/${np.src}static.png` },
        style: [styles.npBg, { resizeMode: "cover" }]
      }
    ),
    /* @__PURE__ */ React.createElement(Text, { style: styles.npName }, np.name),
    /* @__PURE__ */ React.createElement(
      TouchableOpacity,
      {
        style: styles.deleteBtn,
        onPress: () => {
          delete storage.capturedNameplates[skuId];
          if (storage.nameplate === skuId) storage.nameplate = "";
        }
      },
      /* @__PURE__ */ React.createElement(Text, { style: styles.deleteBtnText }, "\xD7")
    )
  )), /* @__PURE__ */ React.createElement(View, { style: [styles.buttonRow, { marginTop: 8 }] }, /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      style: [styles.button, { backgroundColor: "#da373c" }],
      onPress: () => {
        Alert.alert("clear all", "delete ALL nameplates? no undo lol", [
          { text: "nah", style: "cancel" },
          { text: "yep", style: "destructive", onPress: () => {
            storage.capturedNameplates = {};
            storage.nameplate = "";
          } }
        ]);
      }
    },
    /* @__PURE__ */ React.createElement(Text, { style: styles.buttonText }, "\u{1F5D1}\uFE0F clear all")
  )));
}
function BadgeToggle({ badgeKey, badge, isActive, onToggle }) {
  return /* @__PURE__ */ React.createElement(TouchableOpacity, { style: styles.badgeRow, onPress: () => onToggle(!isActive), activeOpacity: 0.6 }, /* @__PURE__ */ React.createElement(
    Image,
    {
      source: { uri: `https://cdn.discordapp.com/badge-icons/${badge.icon}.png` },
      style: styles.badgeIcon
    }
  ), /* @__PURE__ */ React.createElement(Text, { style: styles.badgeText }, badge.description), /* @__PURE__ */ React.createElement(Switch, { value: isActive, onValueChange: onToggle }));
}
function CaptureSection() {
  useProxy(storage);
  const [captureId, setCaptureId] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [statusColor, setStatusColor] = React.useState("#72767d");
  const doCapture = async () => {
    const id = captureId.trim();
    if (!id || !/^\d{17,20}$/.test(id)) {
      setStatus("\u274C thats not a valid id lol");
      setStatusColor("#da373c");
      return;
    }
    setStatus("\u23F3 snagging...");
    setStatusColor("#f0b232");
    const result = await captureFromUserId(id);
    setStatus(result.message);
    setStatusColor(result.success ? "#23a55a" : "#da373c");
  };
  return /* @__PURE__ */ React.createElement(View, { style: styles.card }, /* @__PURE__ */ React.createElement(Text, { style: styles.cardTitle }, "\u{1F3AF} snag from user id"), /* @__PURE__ */ React.createElement(Text, { style: styles.cardDesc }, "paste a user id and yoink their decoration + nameplate. they gotta be cached tho (open their profile first)"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.input,
      placeholder: "paste user id here...",
      placeholderTextColor: "#72767d",
      value: captureId,
      onChangeText: setCaptureId,
      keyboardType: "number-pad"
    }
  ), /* @__PURE__ */ React.createElement(View, { style: { flexDirection: "row", gap: 8, marginBottom: 6 } }, /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      style: [styles.button, { backgroundColor: "#5865f2", flex: 1 }],
      onPress: doCapture
    },
    /* @__PURE__ */ React.createElement(Text, { style: styles.buttonText }, "\u{1F3AF} snag")
  )), status ? /* @__PURE__ */ React.createElement(Text, { style: [styles.statusText, { color: statusColor }] }, status) : null);
}
function Settings() {
  useProxy(storage);
  const datePresets = [
    { label: "og 2015", date: "2015-05-13" },
    { label: "2016 era", date: "2016-01-15" },
    { label: "2017 vibes", date: "2017-06-01" },
    { label: "2020 quarantine", date: "2020-03-15" },
    { label: "clear", date: "", color: "#da373c" }
  ];
  const doExport = () => {
    try {
      const data = JSON.stringify(storage, null, 2);
      Clipboard.setString(data);
      showToast("\u2705 copied to clipboard, gz", getAssetIDByName("toast_copy_link"));
    } catch (e) {
      console.error(e);
      showToast("\u274C export failed lol");
    }
  };
  const doImport = async () => {
    try {
      const text = await Clipboard.getString();
      const data = JSON.parse(text);
      if (!data || typeof data !== "object") {
        showToast("\u274C invalid data lol");
        return;
      }
      Alert.alert("import backup", "MERGE keeps yours + adds from clipboard.\nREPLACE wipes and uses clipboard only.", [
        { text: "merge", onPress: () => {
          if (data.capturedDecorations) Object.assign(storage.capturedDecorations, data.capturedDecorations);
          if (data.capturedNameplates) Object.assign(storage.capturedNameplates, data.capturedNameplates);
          if (data.activeBadges) storage.activeBadges = [.../* @__PURE__ */ new Set([...storage.activeBadges || [], ...data.activeBadges])];
          showToast("\u2705 merged, nice");
        } },
        { text: "replace", style: "destructive", onPress: () => {
          Object.keys(data).forEach((k) => {
            storage[k] = data[k];
          });
          showToast("\u2705 replaced, gl larping");
        } },
        { text: "cancel", style: "cancel" }
      ]);
    } catch (e) {
      console.error(e);
      showToast("\u274C invalid json in clipboard lol");
    }
  };
  const doScanAll = () => {
    try {
      const UserStore = findByStoreName("UserStore");
      const { nd, nn } = runCapture(UserStore);
      showToast(`snagged +${nd} decorations, +${nn} nameplates${nd + nn === 0 ? " (nothing new lol)" : " gz"}`);
    } catch (e) {
      showToast("\u274C scan failed lol");
    }
  };
  return /* @__PURE__ */ React.createElement(ScrollView, { style: styles.container }, /* @__PURE__ */ React.createElement(Text, { style: styles.sectionTitle }, "\u{1F441}\uFE0F live preview"), /* @__PURE__ */ React.createElement(Preview, null), /* @__PURE__ */ React.createElement(View, { style: styles.card }, /* @__PURE__ */ React.createElement(Text, { style: styles.cardTitle }, "\u270F\uFE0F visual name"), /* @__PURE__ */ React.createElement(Text, { style: styles.cardDesc }, "only u see this btw. leave blank = keeps original"), /* @__PURE__ */ React.createElement(Text, { style: styles.inputLabel }, "display name"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.input,
      placeholder: "ex: my cool name",
      placeholderTextColor: "#72767d",
      value: storage.displayName,
      onChangeText: (v) => {
        storage.displayName = v.trim();
      }
    }
  ), /* @__PURE__ */ React.createElement(Text, { style: styles.inputLabel }, "username"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.input,
      placeholder: "ex: coolname",
      placeholderTextColor: "#72767d",
      value: storage.username,
      onChangeText: (v) => {
        storage.username = v.trim();
      }
    }
  ), /* @__PURE__ */ React.createElement(Text, { style: styles.idText }, "\u{1F511} id: ", userId || "?"), /* @__PURE__ */ React.createElement(Text, { style: styles.warningText }, "\u26A0\uFE0F only u can see this lol")), /* @__PURE__ */ React.createElement(View, { style: styles.card }, /* @__PURE__ */ React.createElement(Text, { style: styles.cardTitle }, "\u{1F4C5} fake member since"), /* @__PURE__ */ React.createElement(Text, { style: styles.cardDesc }, "makes it look like u joined discord whenever u want lol. leave blank for real date"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.input,
      placeholder: "YYYY-MM-DD (ex: 2015-05-13)",
      placeholderTextColor: "#72767d",
      value: storage.fakeCreatedAt,
      onChangeText: (v) => {
        storage.fakeCreatedAt = v.trim();
      }
    }
  ), /* @__PURE__ */ React.createElement(View, { style: styles.presetRow }, datePresets.map((p, i) => /* @__PURE__ */ React.createElement(
    TouchableOpacity,
    {
      key: i,
      style: [styles.presetBtn, { backgroundColor: p.color || "#4f545c" }],
      onPress: () => {
        storage.fakeCreatedAt = p.date;
      }
    },
    /* @__PURE__ */ React.createElement(Text, { style: styles.presetBtnText }, p.label)
  )))), /* @__PURE__ */ React.createElement(View, { style: styles.card }, /* @__PURE__ */ React.createElement(Text, { style: styles.cardTitle }, "\u{1F465} fake mutuals"), /* @__PURE__ */ React.createElement(Text, { style: styles.cardDesc }, "fake the mutual servers and friends count. leave blank = real numbers"), /* @__PURE__ */ React.createElement(Text, { style: styles.inputLabel }, "mutual servers"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.input,
      placeholder: "ex: 42",
      placeholderTextColor: "#72767d",
      value: storage.fakeMutualGuilds,
      onChangeText: (v) => {
        storage.fakeMutualGuilds = v.trim();
      },
      keyboardType: "number-pad"
    }
  ), /* @__PURE__ */ React.createElement(Text, { style: styles.inputLabel }, "mutual friends"), /* @__PURE__ */ React.createElement(
    TextInput,
    {
      style: styles.input,
      placeholder: "ex: 69",
      placeholderTextColor: "#72767d",
      value: storage.fakeMutualFriends,
      onChangeText: (v) => {
        storage.fakeMutualFriends = v.trim();
      },
      keyboardType: "number-pad"
    }
  )), /* @__PURE__ */ React.createElement(CaptureSection, null), /* @__PURE__ */ React.createElement(View, { style: styles.buttonRow }, /* @__PURE__ */ React.createElement(TouchableOpacity, { style: [styles.button, { backgroundColor: "#5865f2" }], onPress: doScanAll }, /* @__PURE__ */ React.createElement(Text, { style: styles.buttonText }, "\u{1F504} capture all")), /* @__PURE__ */ React.createElement(TouchableOpacity, { style: [styles.button, { backgroundColor: "#23a55a" }], onPress: doExport }, /* @__PURE__ */ React.createElement(Text, { style: styles.buttonText }, "\u{1F4E4} export")), /* @__PURE__ */ React.createElement(TouchableOpacity, { style: [styles.button, { backgroundColor: "#f0b232" }], onPress: doImport }, /* @__PURE__ */ React.createElement(Text, { style: styles.buttonText }, "\u{1F4E5} import"))), /* @__PURE__ */ React.createElement(DecorationPicker, null), /* @__PURE__ */ React.createElement(NameplatePicker, null), realBadges.length > 0 && /* @__PURE__ */ React.createElement(View, null, /* @__PURE__ */ React.createElement(Text, { style: styles.sectionTitle }, "\u{1F464} ur real badges (toggle to hide)"), /* @__PURE__ */ React.createElement(View, { style: styles.card }, realBadges.map((badge, i) => /* @__PURE__ */ React.createElement(
    BadgeToggle,
    {
      key: badge.id || i,
      badge,
      isActive: !(storage.hiddenBadges || []).includes(badge.id),
      onToggle: (checked) => {
        if (!checked) {
          if (!(storage.hiddenBadges || []).includes(badge.id)) {
            storage.hiddenBadges = [...storage.hiddenBadges || [], badge.id];
          }
        } else {
          storage.hiddenBadges = (storage.hiddenBadges || []).filter((x) => x !== badge.id);
        }
      }
    }
  )))), /* @__PURE__ */ React.createElement(Text, { style: styles.sectionTitle }, "\u{1F3C5} add fake badges (larp mode lol)"), /* @__PURE__ */ React.createElement(View, { style: styles.card }, /* @__PURE__ */ React.createElement(Text, { style: styles.cardDesc }, "toggle to add em. order is auto btw"), Object.entries(BADGES_CATALOG).map(([key, badge]) => /* @__PURE__ */ React.createElement(
    BadgeToggle,
    {
      key,
      badgeKey: key,
      badge,
      isActive: (storage.activeBadges || []).includes(key),
      onToggle: (checked) => {
        if (checked) {
          storage.activeBadges = [...storage.activeBadges || [], key];
        } else {
          storage.activeBadges = (storage.activeBadges || []).filter((x) => x !== key);
        }
      }
    }
  ))), /* @__PURE__ */ React.createElement(View, { style: { height: 60 } }));
}
function onLoad() {
  try {
    storage.activeBadges ??= [];
    storage.hiddenBadges ??= [];
    storage.displayName ??= "";
    storage.username ??= "";
    storage.decoration ??= "";
    storage.nameplate ??= "";
    storage.capturedDecorations ??= {};
    storage.capturedNameplates ??= {};
    storage.fakeCreatedAt ??= "";
    storage.fakeMutualGuilds ??= "";
    storage.fakeMutualFriends ??= "";
    const UserStore = findByStoreName("UserStore");
    const UserProfileStore = findByStoreName("UserProfileStore");
    userId = UserStore.getCurrentUser()?.id;
    if (!userId) {
      console.error("[MultiLarpingTool] couldn't get user id lol");
      return;
    }
    const profile = UserProfileStore.getUserProfile(userId);
    realBadges = profile?.badges ? [...profile.badges] : [];
    patches.push(
      after("getUserProfile", UserProfileStore, ([uid], profile2) => {
        if (!profile2 || uid !== userId) return;
        profile2.badges ??= [];
        if ((storage.hiddenBadges || []).length > 0) {
          profile2.badges = profile2.badges.filter((b) => !(storage.hiddenBadges || []).includes(b.id));
        }
        const selectedBadges = (storage.activeBadges || []).map((id) => BADGES_CATALOG[id]).filter(Boolean);
        const existing = new Set(profile2.badges.map((b) => b.id));
        for (const badge of selectedBadges) {
          if (!existing.has(badge.id)) profile2.badges.push(badge);
        }
        profile2.badges = sortBadges(profile2.badges);
      })
    );
    patches.push(
      after("getCurrentUser", UserStore, (args, user) => {
        if (!user || user.id !== userId) return;
        modifyUser(user);
      })
    );
    patches.push(
      after("getUser", UserStore, ([uid], user) => {
        if (!user || uid !== userId) return;
        modifyUser(user);
      })
    );
    try {
      const mutualGuildsModule = findByProps("getMutualGuilds");
      if (mutualGuildsModule) {
        patches.push(
          after("getMutualGuilds", mutualGuildsModule, ([uid], result) => {
            if (uid !== userId || !storage.fakeMutualGuilds) return result;
            const count = parseInt(storage.fakeMutualGuilds);
            if (isNaN(count) || count < 0) return result;
            const fakeGuilds = [];
            for (let i = 0; i < count; i++) {
              fakeGuilds.push({ guild: { id: `fake_${i}`, name: `server ${i + 1}`, icon: null }, nick: null });
            }
            return fakeGuilds;
          })
        );
      }
      const mutualFriendsModule = findByProps("getMutualFriends");
      if (mutualFriendsModule) {
        patches.push(
          after("getMutualFriends", mutualFriendsModule, ([uid], result) => {
            if (uid !== userId || !storage.fakeMutualFriends) return result;
            const count = parseInt(storage.fakeMutualFriends);
            if (isNaN(count) || count < 0) return result;
            const fakeFriends = [];
            for (let i = 0; i < count; i++) {
              fakeFriends.push({ key: `fake_friend_${i}`, user: { id: `fake_friend_${i}`, username: `friend${i + 1}`, avatar: null } });
            }
            return fakeFriends;
          })
        );
      }
    } catch (e) {
      console.error("[MultiLarpingTool] mutuals patch failed:", e);
    }
    try {
      const TimestampModule = findByProps("extractTimestamp");
      if (TimestampModule) {
        patches.push(
          after("extractTimestamp", TimestampModule, ([snowflake], result) => {
            if (!storage.fakeCreatedAt) return result;
            const currentUser = UserStore.getCurrentUser();
            if (!currentUser) return result;
            if (snowflake === currentUser.id || snowflake === currentUser._realId) {
              const fakeDate = new Date(storage.fakeCreatedAt);
              if (!isNaN(fakeDate.getTime())) return fakeDate.getTime();
            }
            return result;
          })
        );
      }
    } catch (e) {
      console.error("[MultiLarpingTool] created at patch failed:", e);
    }
    runCapture(UserStore);
    captureInterval = setInterval(() => runCapture(UserStore), 5e3);
    console.log(`[MultiLarpingTool] loaded -- ${Object.keys(storage.capturedDecorations).length} decorations -- ${Object.keys(storage.capturedNameplates).length} nameplates btw`);
  } catch (e) {
    console.error("[MultiLarpingTool] error on start:", e);
  }
}
function onUnload() {
  for (const unpatch of patches) unpatch();
  patches = [];
  if (captureInterval) clearInterval(captureInterval);
  console.log("[MultiLarpingTool] unloaded");
}
var settings = Settings;
export {
  onLoad,
  onUnload,
  settings
};
