import * as Context from 'effect/Context';
import * as Micro from 'effect/Micro';
import * as effect_Cause from 'effect/Cause';
import * as effect_Types from 'effect/Types';
import { Micro as Micro$1 } from 'effect';

type ErrorReason = {
    readonly type: "NotOkResponse";
    readonly errorCode?: number;
    readonly details?: string;
} | {
    readonly type: "UnexpectedResponse";
    readonly response: unknown;
} | {
    readonly type: "ClientInternalError";
    readonly cause: unknown;
} | {
    readonly type: "UnableToGetFile";
    readonly cause: unknown;
};
declare const TgBotClientError_base: new <A extends Record<string, any> = {}>(args: effect_Types.Equals<A, {}> extends true ? void : { readonly [P in keyof A as P extends "_tag" ? never : P]: A[P]; }) => effect_Cause.YieldableError & {
    readonly _tag: "TgBotClientError";
} & Readonly<A>;
declare class TgBotClientError extends TgBotClientError_base<{
    reason: ErrorReason;
}> {
    static readonly missingSuccess: TgBotClientError;
}

type TgBotClientSettingsInput = {
    ["bot-token"]: string;
    ["base-url"]?: string;
};

type TgBotClientConfigObject = Required<TgBotClientSettingsInput>;
declare const TgBotClientConfig_base: Context.TagClass<TgBotClientConfig, "TgBotClientConfig", Required<TgBotClientSettingsInput>>;
declare class TgBotClientConfig extends TgBotClientConfig_base {
}

interface AffiliateInfo {
    commission_per_mille: number;
    amount: number;
    affiliate_user?: User;
    affiliate_chat?: Chat;
    nanostar_amount?: number;
}
interface Animation {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    duration: number;
    thumbnail?: PhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
interface Audio {
    file_id: string;
    file_unique_id: string;
    duration: number;
    performer?: string;
    title?: string;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
    thumbnail?: PhotoSize;
}
type BackgroundFill = BackgroundFillSolid | BackgroundFillGradient | BackgroundFillFreeformGradient;
interface BackgroundFillFreeformGradient {
    type: "freeform_gradient";
    colors: number[];
}
interface BackgroundFillGradient {
    type: "gradient";
    top_color: number;
    bottom_color: number;
    rotation_angle: number;
}
interface BackgroundFillSolid {
    type: "solid";
    color: number;
}
type BackgroundType = BackgroundTypeFill | BackgroundTypeWallpaper | BackgroundTypePattern | BackgroundTypeChatTheme;
interface BackgroundTypeChatTheme {
    type: "chat_theme";
    theme_name: string;
}
interface BackgroundTypeFill {
    type: "fill";
    fill: BackgroundFill;
    dark_theme_dimming: number;
}
interface BackgroundTypePattern {
    type: "pattern";
    document: Document;
    fill: BackgroundFill;
    intensity: number;
    is_inverted?: boolean;
    is_moving?: boolean;
}
interface BackgroundTypeWallpaper {
    type: "wallpaper";
    document: Document;
    dark_theme_dimming: number;
    is_blurred?: boolean;
    is_moving?: boolean;
}
interface Birthdate {
    day: number;
    month: number;
    year?: number;
}
interface BotCommand {
    command: string;
    description: string;
}
type BotCommandScope = BotCommandScopeDefault | BotCommandScopeAllPrivateChats | BotCommandScopeAllGroupChats | BotCommandScopeAllChatAdministrators | BotCommandScopeChat | BotCommandScopeChatAdministrators | BotCommandScopeChatMember;
interface BotCommandScopeAllChatAdministrators {
    type: "all_chat_administrators";
}
interface BotCommandScopeAllGroupChats {
    type: "all_group_chats";
}
interface BotCommandScopeAllPrivateChats {
    type: "all_private_chats";
}
interface BotCommandScopeChat {
    type: "chat";
    chat_id: number | string;
}
interface BotCommandScopeChatAdministrators {
    type: "chat_administrators";
    chat_id: number | string;
}
interface BotCommandScopeChatMember {
    type: "chat_member";
    chat_id: number | string;
    user_id: number;
}
interface BotCommandScopeDefault {
    type: "default";
}
interface BotDescription {
    description: string;
}
interface BotName {
    name: string;
}
interface BotShortDescription {
    short_description: string;
}
interface BusinessConnection {
    id: string;
    user: User;
    user_chat_id: number;
    date: number;
    can_reply: boolean;
    is_enabled: boolean;
}
interface BusinessIntro {
    title?: string;
    message?: string;
    sticker?: Sticker;
}
interface BusinessLocation {
    address: string;
    location?: Location;
}
interface BusinessMessagesDeleted {
    business_connection_id: string;
    chat: Chat;
    message_ids: number[];
}
interface BusinessOpeningHours {
    time_zone_name: string;
    opening_hours: BusinessOpeningHoursInterval[];
}
interface BusinessOpeningHoursInterval {
    opening_minute: number;
    closing_minute: number;
}
type CallbackGame = never;
interface CallbackQuery {
    id: string;
    from: User;
    chat_instance: string;
    message?: MaybeInaccessibleMessage;
    inline_message_id?: string;
    data?: string;
    game_short_name?: string;
}
interface Chat {
    id: number;
    type: "private" | "group" | "supergroup" | "channel";
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_forum?: boolean;
}
interface ChatAdministratorRights {
    is_anonymous: boolean;
    can_manage_chat: boolean;
    can_delete_messages: boolean;
    can_manage_video_chats: boolean;
    can_restrict_members: boolean;
    can_promote_members: boolean;
    can_change_info: boolean;
    can_invite_users: boolean;
    can_post_stories: boolean;
    can_edit_stories: boolean;
    can_delete_stories: boolean;
    can_post_messages?: boolean;
    can_edit_messages?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
}
interface ChatBackground {
    type: BackgroundType;
}
interface ChatBoost {
    boost_id: string;
    add_date: number;
    expiration_date: number;
    source: ChatBoostSource;
}
interface ChatBoostAdded {
    boost_count: number;
}
interface ChatBoostRemoved {
    chat: Chat;
    boost_id: string;
    remove_date: number;
    source: ChatBoostSource;
}
type ChatBoostSource = ChatBoostSourcePremium | ChatBoostSourceGiftCode | ChatBoostSourceGiveaway;
interface ChatBoostSourceGiftCode {
    source: "gift_code";
    user: User;
}
interface ChatBoostSourceGiveaway {
    source: "giveaway";
    giveaway_message_id: number;
    user?: User;
    prize_star_count?: number;
    is_unclaimed?: boolean;
}
interface ChatBoostSourcePremium {
    source: "premium";
    user: User;
}
interface ChatBoostUpdated {
    chat: Chat;
    boost: ChatBoost;
}
interface ChatFullInfo {
    id: number;
    type: "private" | "group" | "supergroup" | "channel";
    accent_color_id: number;
    max_reaction_count: number;
    title?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    is_forum?: boolean;
    photo?: ChatPhoto;
    active_usernames?: string[];
    birthdate?: Birthdate;
    business_intro?: BusinessIntro;
    business_location?: BusinessLocation;
    business_opening_hours?: BusinessOpeningHours;
    personal_chat?: Chat;
    available_reactions?: ReactionType[];
    background_custom_emoji_id?: string;
    profile_accent_color_id?: number;
    profile_background_custom_emoji_id?: string;
    emoji_status_custom_emoji_id?: string;
    emoji_status_expiration_date?: number;
    bio?: string;
    has_private_forwards?: boolean;
    has_restricted_voice_and_video_messages?: boolean;
    join_to_send_messages?: boolean;
    join_by_request?: boolean;
    description?: string;
    invite_link?: string;
    pinned_message?: Message;
    permissions?: ChatPermissions;
    can_send_paid_media?: boolean;
    slow_mode_delay?: number;
    unrestrict_boost_count?: number;
    message_auto_delete_time?: number;
    has_aggressive_anti_spam_enabled?: boolean;
    has_hidden_members?: boolean;
    has_protected_content?: boolean;
    has_visible_history?: boolean;
    sticker_set_name?: string;
    can_set_sticker_set?: boolean;
    custom_emoji_sticker_set_name?: string;
    linked_chat_id?: number;
    location?: ChatLocation;
}
interface ChatInviteLink {
    invite_link: string;
    creator: User;
    creates_join_request: boolean;
    is_primary: boolean;
    is_revoked: boolean;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    pending_join_request_count?: number;
    subscription_period?: number;
    subscription_price?: number;
}
interface ChatJoinRequest {
    chat: Chat;
    from: User;
    user_chat_id: number;
    date: number;
    bio?: string;
    invite_link?: ChatInviteLink;
}
interface ChatLocation {
    location: Location;
    address: string;
}
type ChatMember = ChatMemberOwner | ChatMemberAdministrator | ChatMemberMember | ChatMemberRestricted | ChatMemberLeft | ChatMemberBanned;
interface ChatMemberAdministrator {
    status: "administrator";
    user: User;
    can_be_edited: boolean;
    is_anonymous: boolean;
    can_manage_chat: boolean;
    can_delete_messages: boolean;
    can_manage_video_chats: boolean;
    can_restrict_members: boolean;
    can_promote_members: boolean;
    can_change_info: boolean;
    can_invite_users: boolean;
    can_post_stories: boolean;
    can_edit_stories: boolean;
    can_delete_stories: boolean;
    can_post_messages?: boolean;
    can_edit_messages?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
    custom_title?: string;
}
interface ChatMemberBanned {
    status: "kicked";
    user: User;
    until_date: number;
}
interface ChatMemberLeft {
    status: "left";
    user: User;
}
interface ChatMemberMember {
    status: "member";
    user: User;
    until_date?: number;
}
interface ChatMemberOwner {
    status: "creator";
    user: User;
    is_anonymous: boolean;
    custom_title?: string;
}
interface ChatMemberRestricted {
    status: "restricted";
    user: User;
    is_member: boolean;
    can_send_messages: boolean;
    can_send_audios: boolean;
    can_send_documents: boolean;
    can_send_photos: boolean;
    can_send_videos: boolean;
    can_send_video_notes: boolean;
    can_send_voice_notes: boolean;
    can_send_polls: boolean;
    can_send_other_messages: boolean;
    can_add_web_page_previews: boolean;
    can_change_info: boolean;
    can_invite_users: boolean;
    can_pin_messages: boolean;
    can_manage_topics: boolean;
    until_date: number;
}
interface ChatMemberUpdated {
    chat: Chat;
    from: User;
    date: number;
    old_chat_member: ChatMember;
    new_chat_member: ChatMember;
    invite_link?: ChatInviteLink;
    via_join_request?: boolean;
    via_chat_folder_invite_link?: boolean;
}
interface ChatPermissions {
    can_send_messages?: boolean;
    can_send_audios?: boolean;
    can_send_documents?: boolean;
    can_send_photos?: boolean;
    can_send_videos?: boolean;
    can_send_video_notes?: boolean;
    can_send_voice_notes?: boolean;
    can_send_polls?: boolean;
    can_send_other_messages?: boolean;
    can_add_web_page_previews?: boolean;
    can_change_info?: boolean;
    can_invite_users?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
}
interface ChatPhoto {
    small_file_id: string;
    small_file_unique_id: string;
    big_file_id: string;
    big_file_unique_id: string;
}
interface ChatShared {
    request_id: number;
    chat_id: number;
    title?: string;
    username?: string;
    photo?: PhotoSize[];
}
interface ChosenInlineResult {
    result_id: string;
    from: User;
    query: string;
    location?: Location;
    inline_message_id?: string;
}
interface Contact {
    phone_number: string;
    first_name: string;
    last_name?: string;
    user_id?: number;
    vcard?: string;
}
interface CopyTextButton {
    text: string;
}
interface Dice {
    emoji: string;
    value: number;
}
interface Document {
    file_id: string;
    file_unique_id: string;
    thumbnail?: PhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
interface EncryptedCredentials {
    data: string;
    hash: string;
    secret: string;
}
interface EncryptedPassportElement {
    type: string;
    hash: string;
    data?: string;
    phone_number?: string;
    email?: string;
    files?: PassportFile[];
    front_side?: PassportFile;
    reverse_side?: PassportFile;
    selfie?: PassportFile;
    translation?: PassportFile[];
}
interface ExternalReplyInfo {
    origin: MessageOrigin;
    chat?: Chat;
    message_id?: number;
    link_preview_options?: LinkPreviewOptions;
    animation?: Animation;
    audio?: Audio;
    document?: Document;
    paid_media?: PaidMediaInfo;
    photo?: PhotoSize[];
    sticker?: Sticker;
    story?: Story;
    video?: Video;
    video_note?: VideoNote;
    voice?: Voice;
    has_media_spoiler?: boolean;
    contact?: Contact;
    dice?: Dice;
    game?: Game;
    giveaway?: Giveaway;
    giveaway_winners?: GiveawayWinners;
    invoice?: Invoice;
    location?: Location;
    poll?: Poll;
    venue?: Venue;
}
interface File$1 {
    file_id: string;
    file_unique_id: string;
    file_size?: number;
    file_path?: string;
}
interface ForceReply {
    force_reply: boolean;
    input_field_placeholder?: string;
    selective?: boolean;
}
interface ForumTopic {
    message_thread_id: number;
    name: string;
    icon_color: number;
    icon_custom_emoji_id?: string;
}
type ForumTopicClosed = never;
interface ForumTopicCreated {
    name: string;
    icon_color: number;
    icon_custom_emoji_id?: string;
}
interface ForumTopicEdited {
    name?: string;
    icon_custom_emoji_id?: string;
}
type ForumTopicReopened = never;
interface Game {
    title: string;
    description: string;
    photo: PhotoSize[];
    text?: string;
    text_entities?: MessageEntity[];
    animation?: Animation;
}
interface GameHighScore {
    position: number;
    user: User;
    score: number;
}
type GeneralForumTopicHidden = never;
type GeneralForumTopicUnhidden = never;
interface Gift {
    id: string;
    sticker: Sticker;
    star_count: number;
    total_count?: number;
    remaining_count?: number;
}
interface Gifts {
    gifts: Gift[];
}
interface Giveaway {
    chats: Chat[];
    winners_selection_date: number;
    winner_count: number;
    only_new_members?: boolean;
    has_public_winners?: boolean;
    prize_description?: string;
    country_codes?: string[];
    prize_star_count?: number;
    premium_subscription_month_count?: number;
}
interface GiveawayCompleted {
    winner_count: number;
    unclaimed_prize_count?: number;
    giveaway_message?: Message;
    is_star_giveaway?: boolean;
}
interface GiveawayCreated {
    prize_star_count?: number;
}
interface GiveawayWinners {
    chat: Chat;
    giveaway_message_id: number;
    winners_selection_date: number;
    winner_count: number;
    winners: User[];
    additional_chat_count?: number;
    prize_star_count?: number;
    premium_subscription_month_count?: number;
    unclaimed_prize_count?: number;
    only_new_members?: boolean;
    was_refunded?: boolean;
    prize_description?: string;
}
interface InaccessibleMessage {
    chat: Chat;
    message_id: number;
    date: number;
}
interface InlineKeyboardButton {
    text: string;
    url?: string;
    callback_data?: string;
    web_app?: WebAppInfo;
    login_url?: LoginUrl;
    switch_inline_query?: string;
    switch_inline_query_current_chat?: string;
    switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat;
    copy_text?: CopyTextButton;
    callback_game?: CallbackGame;
    pay?: boolean;
}
interface InlineKeyboardMarkup {
    inline_keyboard: InlineKeyboardButton[][];
}
interface InlineQuery {
    id: string;
    from: User;
    query: string;
    offset: string;
    chat_type?: string;
    location?: Location;
}
type InlineQueryResult = InlineQueryResultCachedAudio | InlineQueryResultCachedDocument | InlineQueryResultCachedGif | InlineQueryResultCachedMpeg4Gif | InlineQueryResultCachedPhoto | InlineQueryResultCachedSticker | InlineQueryResultCachedVideo | InlineQueryResultCachedVoice | InlineQueryResultArticle | InlineQueryResultAudio | InlineQueryResultContact | InlineQueryResultGame | InlineQueryResultDocument | InlineQueryResultGif | InlineQueryResultLocation | InlineQueryResultMpeg4Gif | InlineQueryResultPhoto | InlineQueryResultVenue | InlineQueryResultVideo | InlineQueryResultVoice;
interface InlineQueryResultArticle {
    type: "article";
    id: string;
    title: string;
    input_message_content: InputMessageContent;
    reply_markup?: InlineKeyboardMarkup;
    url?: string;
    hide_url?: boolean;
    description?: string;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
}
interface InlineQueryResultAudio {
    type: "audio";
    id: string;
    audio_url: string;
    title: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    performer?: string;
    audio_duration?: number;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedAudio {
    type: "audio";
    id: string;
    audio_file_id: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedDocument {
    type: "document";
    id: string;
    title: string;
    document_file_id: string;
    description?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedGif {
    type: "gif";
    id: string;
    gif_file_id: string;
    title?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedMpeg4Gif {
    type: "mpeg4_gif";
    id: string;
    mpeg4_file_id: string;
    title?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedPhoto {
    type: "photo";
    id: string;
    photo_file_id: string;
    title?: string;
    description?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedSticker {
    type: "sticker";
    id: string;
    sticker_file_id: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedVideo {
    type: "video";
    id: string;
    video_file_id: string;
    title: string;
    description?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultCachedVoice {
    type: "voice";
    id: string;
    voice_file_id: string;
    title: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultContact {
    type: "contact";
    id: string;
    phone_number: string;
    first_name: string;
    last_name?: string;
    vcard?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
}
interface InlineQueryResultDocument {
    type: "document";
    id: string;
    title: string;
    document_url: string;
    mime_type: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    description?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
}
interface InlineQueryResultGame {
    type: "game";
    id: string;
    game_short_name: string;
    reply_markup?: InlineKeyboardMarkup;
}
interface InlineQueryResultGif {
    type: "gif";
    id: string;
    gif_url: string;
    thumbnail_url: string;
    gif_width?: number;
    gif_height?: number;
    gif_duration?: number;
    thumbnail_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
    title?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultLocation {
    type: "location";
    id: string;
    latitude: number;
    longitude: number;
    title: string;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
}
interface InlineQueryResultMpeg4Gif {
    type: "mpeg4_gif";
    id: string;
    mpeg4_url: string;
    thumbnail_url: string;
    mpeg4_width?: number;
    mpeg4_height?: number;
    mpeg4_duration?: number;
    thumbnail_mime_type?: "image/jpeg" | "image/gif" | "video/mp4";
    title?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultPhoto {
    type: "photo";
    id: string;
    photo_url: string;
    thumbnail_url: string;
    photo_width?: number;
    photo_height?: number;
    title?: string;
    description?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultsButton {
    text: string;
    web_app?: WebAppInfo;
    start_parameter?: string;
}
interface InlineQueryResultVenue {
    type: "venue";
    id: string;
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    foursquare_id?: string;
    foursquare_type?: string;
    google_place_id?: string;
    google_place_type?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
    thumbnail_url?: string;
    thumbnail_width?: number;
    thumbnail_height?: number;
}
interface InlineQueryResultVideo {
    type: "video";
    id: string;
    video_url: string;
    mime_type: string;
    thumbnail_url: string;
    title: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    video_width?: number;
    video_height?: number;
    video_duration?: number;
    description?: string;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InlineQueryResultVoice {
    type: "voice";
    id: string;
    voice_url: string;
    title: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    voice_duration?: number;
    reply_markup?: InlineKeyboardMarkup;
    input_message_content?: InputMessageContent;
}
interface InputContactMessageContent {
    phone_number: string;
    first_name: string;
    last_name?: string;
    vcard?: string;
}
type InputFile = {
    file_content: Uint8Array;
    file_name: string;
};
interface InputInvoiceMessageContent {
    title: string;
    description: string;
    payload: string;
    currency: string;
    prices: LabeledPrice[];
    provider_token?: string;
    max_tip_amount?: number;
    suggested_tip_amounts?: number[];
    provider_data?: string;
    photo_url?: string;
    photo_size?: number;
    photo_width?: number;
    photo_height?: number;
    need_name?: boolean;
    need_phone_number?: boolean;
    need_email?: boolean;
    need_shipping_address?: boolean;
    send_phone_number_to_provider?: boolean;
    send_email_to_provider?: boolean;
    is_flexible?: boolean;
}
interface InputLocationMessageContent {
    latitude: number;
    longitude: number;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
}
type InputMedia = InputMediaAnimation | InputMediaDocument | InputMediaAudio | InputMediaPhoto | InputMediaVideo;
interface InputMediaAnimation {
    type: "animation";
    media: string;
    thumbnail?: InputFile | string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    width?: number;
    height?: number;
    duration?: number;
    has_spoiler?: boolean;
}
interface InputMediaAudio {
    type: "audio";
    media: string;
    thumbnail?: InputFile | string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    duration?: number;
    performer?: string;
    title?: string;
}
interface InputMediaDocument {
    type: "document";
    media: string;
    thumbnail?: InputFile | string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    disable_content_type_detection?: boolean;
}
interface InputMediaPhoto {
    type: "photo";
    media: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    has_spoiler?: boolean;
}
interface InputMediaVideo {
    type: "video";
    media: string;
    thumbnail?: InputFile | string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    width?: number;
    height?: number;
    duration?: number;
    supports_streaming?: boolean;
    has_spoiler?: boolean;
}
type InputMessageContent = InputTextMessageContent | InputLocationMessageContent | InputVenueMessageContent | InputContactMessageContent | InputInvoiceMessageContent;
type InputPaidMedia = InputPaidMediaPhoto | InputPaidMediaVideo;
interface InputPaidMediaPhoto {
    type: "photo";
    media: string;
}
interface InputPaidMediaVideo {
    type: "video";
    media: string;
    thumbnail?: InputFile | string;
    width?: number;
    height?: number;
    duration?: number;
    supports_streaming?: boolean;
}
interface InputPollOption {
    text: string;
    text_parse_mode?: "HTML" | "MarkdownV2";
    text_entities?: MessageEntity[];
}
interface InputSticker {
    sticker: InputFile | string;
    format: "static" | "animated" | "video";
    emoji_list: string[];
    mask_position?: MaskPosition;
    keywords?: string[];
}
interface InputTextMessageContent {
    message_text: string;
    parse_mode?: "HTML" | "MarkdownV2";
    entities?: MessageEntity[];
    link_preview_options?: LinkPreviewOptions;
}
interface InputVenueMessageContent {
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    foursquare_id?: string;
    foursquare_type?: string;
    google_place_id?: string;
    google_place_type?: string;
}
interface Invoice {
    title: string;
    description: string;
    start_parameter: string;
    currency: string;
    total_amount: number;
}
interface KeyboardButton {
    text: string;
    request_users?: KeyboardButtonRequestUsers;
    request_chat?: KeyboardButtonRequestChat;
    request_contact?: boolean;
    request_location?: boolean;
    request_poll?: KeyboardButtonPollType;
    web_app?: WebAppInfo;
}
interface KeyboardButtonPollType {
    type?: string;
}
interface KeyboardButtonRequestChat {
    request_id: number;
    chat_is_channel: boolean;
    chat_is_forum?: boolean;
    chat_has_username?: boolean;
    chat_is_created?: boolean;
    user_administrator_rights?: ChatAdministratorRights;
    bot_administrator_rights?: ChatAdministratorRights;
    bot_is_member?: boolean;
    request_title?: boolean;
    request_username?: boolean;
    request_photo?: boolean;
}
interface KeyboardButtonRequestUsers {
    request_id: number;
    user_is_bot?: boolean;
    user_is_premium?: boolean;
    max_quantity?: number;
    request_name?: boolean;
    request_username?: boolean;
    request_photo?: boolean;
}
interface LabeledPrice {
    label: string;
    amount: number;
}
interface LinkPreviewOptions {
    is_disabled?: boolean;
    url?: string;
    prefer_small_media?: boolean;
    prefer_large_media?: boolean;
    show_above_text?: boolean;
}
interface Location {
    latitude: number;
    longitude: number;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
}
interface LoginUrl {
    url: string;
    forward_text?: string;
    bot_username?: string;
    request_write_access?: boolean;
}
interface MaskPosition {
    point: string;
    x_shift: number;
    y_shift: number;
    scale: number;
}
type MaybeInaccessibleMessage = Message | InaccessibleMessage;
type MenuButton = MenuButtonCommands | MenuButtonWebApp | MenuButtonDefault;
interface MenuButtonCommands {
    type: "commands";
}
interface MenuButtonDefault {
    type: "default";
}
interface MenuButtonWebApp {
    type: "web_app";
    text: string;
    web_app: WebAppInfo;
}
interface Message {
    message_id: number;
    date: number;
    chat: Chat;
    message_thread_id?: number;
    from?: User;
    sender_chat?: Chat;
    sender_boost_count?: number;
    sender_business_bot?: User;
    business_connection_id?: string;
    forward_origin?: MessageOrigin;
    is_topic_message?: boolean;
    is_automatic_forward?: boolean;
    reply_to_message?: Message;
    external_reply?: ExternalReplyInfo;
    quote?: TextQuote;
    reply_to_story?: Story;
    via_bot?: User;
    edit_date?: number;
    has_protected_content?: boolean;
    is_from_offline?: boolean;
    media_group_id?: string;
    author_signature?: string;
    text?: string;
    entities?: MessageEntity[];
    link_preview_options?: LinkPreviewOptions;
    effect_id?: string;
    animation?: Animation;
    audio?: Audio;
    document?: Document;
    paid_media?: PaidMediaInfo;
    photo?: PhotoSize[];
    sticker?: Sticker;
    story?: Story;
    video?: Video;
    video_note?: VideoNote;
    voice?: Voice;
    caption?: string;
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    has_media_spoiler?: boolean;
    contact?: Contact;
    dice?: Dice;
    game?: Game;
    poll?: Poll;
    venue?: Venue;
    location?: Location;
    new_chat_members?: User[];
    left_chat_member?: User;
    new_chat_title?: string;
    new_chat_photo?: PhotoSize[];
    delete_chat_photo?: boolean;
    group_chat_created?: boolean;
    supergroup_chat_created?: boolean;
    channel_chat_created?: boolean;
    message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged;
    migrate_to_chat_id?: number;
    migrate_from_chat_id?: number;
    pinned_message?: MaybeInaccessibleMessage;
    invoice?: Invoice;
    successful_payment?: SuccessfulPayment;
    refunded_payment?: RefundedPayment;
    users_shared?: UsersShared;
    chat_shared?: ChatShared;
    connected_website?: string;
    write_access_allowed?: WriteAccessAllowed;
    passport_data?: PassportData;
    proximity_alert_triggered?: ProximityAlertTriggered;
    boost_added?: ChatBoostAdded;
    chat_background_set?: ChatBackground;
    forum_topic_created?: ForumTopicCreated;
    forum_topic_edited?: ForumTopicEdited;
    forum_topic_closed?: ForumTopicClosed;
    forum_topic_reopened?: ForumTopicReopened;
    general_forum_topic_hidden?: GeneralForumTopicHidden;
    general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
    giveaway_created?: GiveawayCreated;
    giveaway?: Giveaway;
    giveaway_winners?: GiveawayWinners;
    giveaway_completed?: GiveawayCompleted;
    video_chat_scheduled?: VideoChatScheduled;
    video_chat_started?: VideoChatStarted;
    video_chat_ended?: VideoChatEnded;
    video_chat_participants_invited?: VideoChatParticipantsInvited;
    web_app_data?: WebAppData;
    reply_markup?: InlineKeyboardMarkup;
}
interface MessageAutoDeleteTimerChanged {
    message_auto_delete_time: number;
}
interface MessageEntity {
    type: "mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "blockquote" | "expandable_blockquote" | "code" | "pre" | "text_link" | "text_mention" | "custom_emoji";
    offset: number;
    length: number;
    url?: string;
    user?: User;
    language?: string;
    custom_emoji_id?: string;
}
interface MessageId {
    message_id: number;
}
type MessageOrigin = MessageOriginUser | MessageOriginHiddenUser | MessageOriginChat | MessageOriginChannel;
interface MessageOriginChannel {
    type: "channel";
    date: number;
    chat: Chat;
    message_id: number;
    author_signature?: string;
}
interface MessageOriginChat {
    type: "chat";
    date: number;
    sender_chat: Chat;
    author_signature?: string;
}
interface MessageOriginHiddenUser {
    type: "hidden_user";
    date: number;
    sender_user_name: string;
}
interface MessageOriginUser {
    type: "user";
    date: number;
    sender_user: User;
}
interface MessageReactionCountUpdated {
    chat: Chat;
    message_id: number;
    date: number;
    reactions: ReactionCount[];
}
interface MessageReactionUpdated {
    chat: Chat;
    message_id: number;
    date: number;
    old_reaction: ReactionType[];
    new_reaction: ReactionType[];
    user?: User;
    actor_chat?: Chat;
}
interface OrderInfo {
    name?: string;
    phone_number?: string;
    email?: string;
    shipping_address?: ShippingAddress;
}
type PaidMedia = PaidMediaPreview | PaidMediaPhoto | PaidMediaVideo;
interface PaidMediaInfo {
    star_count: number;
    paid_media: PaidMedia[];
}
interface PaidMediaPhoto {
    type: "photo";
    photo: PhotoSize[];
}
interface PaidMediaPreview {
    type: "preview";
    width?: number;
    height?: number;
    duration?: number;
}
interface PaidMediaPurchased {
    from: User;
    paid_media_payload: string;
}
interface PaidMediaVideo {
    type: "video";
    video: Video;
}
interface PassportData {
    data: EncryptedPassportElement[];
    credentials: EncryptedCredentials;
}
type PassportElementError = PassportElementErrorDataField | PassportElementErrorFrontSide | PassportElementErrorReverseSide | PassportElementErrorSelfie | PassportElementErrorFile | PassportElementErrorFiles | PassportElementErrorTranslationFile | PassportElementErrorTranslationFiles | PassportElementErrorUnspecified;
interface PassportElementErrorDataField {
    source: "data";
    type: "personal_details" | "passport" | "driver_license" | "identity_card" | "internal_passport" | "address";
    field_name: string;
    data_hash: string;
    message: string;
}
interface PassportElementErrorFile {
    source: "file";
    type: "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
    file_hash: string;
    message: string;
}
interface PassportElementErrorFiles {
    source: "files";
    type: "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
    file_hashes: string[];
    message: string;
}
interface PassportElementErrorFrontSide {
    source: "front_side";
    type: "passport" | "driver_license" | "identity_card" | "internal_passport";
    file_hash: string;
    message: string;
}
interface PassportElementErrorReverseSide {
    source: "reverse_side";
    type: "driver_license" | "identity_card";
    file_hash: string;
    message: string;
}
interface PassportElementErrorSelfie {
    source: "selfie";
    type: "passport" | "driver_license" | "identity_card" | "internal_passport";
    file_hash: string;
    message: string;
}
interface PassportElementErrorTranslationFile {
    source: "translation_file";
    type: "passport" | "driver_license" | "identity_card" | "internal_passport" | "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
    file_hash: string;
    message: string;
}
interface PassportElementErrorTranslationFiles {
    source: "translation_files";
    type: "passport" | "driver_license" | "identity_card" | "internal_passport" | "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration";
    file_hashes: string[];
    message: string;
}
interface PassportElementErrorUnspecified {
    source: "unspecified";
    type: string;
    element_hash: string;
    message: string;
}
interface PassportFile {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    file_date: number;
}
interface PhotoSize {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    file_size?: number;
}
interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    total_voter_count: number;
    is_closed: boolean;
    is_anonymous: boolean;
    type: "regular" | "quiz";
    allows_multiple_answers: boolean;
    question_entities?: MessageEntity[];
    correct_option_id?: number;
    explanation?: string;
    explanation_entities?: MessageEntity[];
    open_period?: number;
    close_date?: number;
}
interface PollAnswer {
    poll_id: string;
    option_ids: number[];
    voter_chat?: Chat;
    user?: User;
}
interface PollOption {
    text: string;
    voter_count: number;
    text_entities?: MessageEntity[];
}
interface PreCheckoutQuery {
    id: string;
    from: User;
    currency: string;
    total_amount: number;
    invoice_payload: string;
    shipping_option_id?: string;
    order_info?: OrderInfo;
}
interface PreparedInlineMessage {
    id: string;
    expiration_date: number;
}
interface ProximityAlertTriggered {
    traveler: User;
    watcher: User;
    distance: number;
}
interface ReactionCount {
    type: ReactionType;
    total_count: number;
}
type ReactionType = ReactionTypeEmoji | ReactionTypeCustomEmoji | ReactionTypePaid;
interface ReactionTypeCustomEmoji {
    type: "custom_emoji";
    custom_emoji_id: string;
}
interface ReactionTypeEmoji {
    type: "emoji";
    emoji: "👍" | "👎" | "❤" | "🔥" | "🥰" | "👏" | "😁" | "🤔" | "🤯" | "😱" | "🤬" | "😢" | "🎉" | "🤩" | "🤮" | "💩" | "🙏" | "👌" | "🕊" | "🤡" | "🥱" | "🥴" | "😍" | "🐳" | "❤‍🔥" | "🌚" | "🌭" | "💯" | "🤣" | "⚡" | "🍌" | "🏆" | "💔" | "🤨" | "😐" | "🍓" | "🍾" | "💋" | "🖕" | "😈" | "😴" | "😭" | "🤓" | "👻" | "👨‍💻" | "👀" | "🎃" | "🙈" | "😇" | "😨" | "🤝" | "✍" | "🤗" | "🫡" | "🎅" | "🎄" | "☃" | "💅" | "🤪" | "🗿" | "🆒" | "💘" | "🙉" | "🦄" | "😘" | "💊" | "🙊" | "😎" | "👾" | "🤷‍♂" | "🤷" | "🤷‍♀" | "😡";
}
interface ReactionTypePaid {
    type: "paid";
}
interface RefundedPayment {
    currency: "XTR";
    total_amount: number;
    invoice_payload: string;
    telegram_payment_charge_id: string;
    provider_payment_charge_id?: string;
}
interface ReplyKeyboardMarkup {
    keyboard: KeyboardButton[][];
    is_persistent?: boolean;
    resize_keyboard?: boolean;
    one_time_keyboard?: boolean;
    input_field_placeholder?: string;
    selective?: boolean;
}
interface ReplyKeyboardRemove {
    remove_keyboard: boolean;
    selective?: boolean;
}
interface ReplyParameters {
    message_id: number;
    chat_id?: number | string;
    allow_sending_without_reply?: boolean;
    quote?: string;
    quote_parse_mode?: "HTML" | "MarkdownV2";
    quote_entities?: MessageEntity[];
    quote_position?: number;
}
interface ResponseParameters {
    migrate_to_chat_id?: number;
    retry_after?: number;
}
type RevenueWithdrawalState = RevenueWithdrawalStatePending | RevenueWithdrawalStateSucceeded | RevenueWithdrawalStateFailed;
interface RevenueWithdrawalStateFailed {
    type: "failed";
}
interface RevenueWithdrawalStatePending {
    type: "pending";
}
interface RevenueWithdrawalStateSucceeded {
    type: "succeeded";
    date: number;
    url: string;
}
interface SentWebAppMessage {
    inline_message_id?: string;
}
interface SharedUser {
    user_id: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo?: PhotoSize[];
}
interface ShippingAddress {
    country_code: string;
    state: string;
    city: string;
    street_line1: string;
    street_line2: string;
    post_code: string;
}
interface ShippingOption {
    id: string;
    title: string;
    prices: LabeledPrice[];
}
interface ShippingQuery {
    id: string;
    from: User;
    invoice_payload: string;
    shipping_address: ShippingAddress;
}
interface StarTransaction {
    id: string;
    amount: number;
    date: number;
    nanostar_amount?: number;
    source?: TransactionPartner;
    receiver?: TransactionPartner;
}
interface StarTransactions {
    transactions: StarTransaction[];
}
interface Sticker {
    file_id: string;
    file_unique_id: string;
    type: "regular" | "mask" | "custom_emoji";
    width: number;
    height: number;
    is_animated: boolean;
    is_video: boolean;
    thumbnail?: PhotoSize;
    emoji?: string;
    set_name?: string;
    premium_animation?: File$1;
    mask_position?: MaskPosition;
    custom_emoji_id?: string;
    needs_repainting?: boolean;
    file_size?: number;
}
interface StickerSet {
    name: string;
    title: string;
    sticker_type: "regular" | "mask" | "custom_emoji";
    stickers: Sticker[];
    thumbnail?: PhotoSize;
}
interface Story {
    chat: Chat;
    id: number;
}
interface SuccessfulPayment {
    currency: string;
    total_amount: number;
    invoice_payload: string;
    telegram_payment_charge_id: string;
    provider_payment_charge_id: string;
    subscription_expiration_date?: number;
    is_recurring?: boolean;
    is_first_recurring?: boolean;
    shipping_option_id?: string;
    order_info?: OrderInfo;
}
interface SwitchInlineQueryChosenChat {
    query?: string;
    allow_user_chats?: boolean;
    allow_bot_chats?: boolean;
    allow_group_chats?: boolean;
    allow_channel_chats?: boolean;
}
interface TextQuote {
    text: string;
    position: number;
    entities?: MessageEntity[];
    is_manual?: boolean;
}
type TransactionPartner = TransactionPartnerUser | TransactionPartnerAffiliateProgram | TransactionPartnerFragment | TransactionPartnerTelegramAds | TransactionPartnerTelegramApi | TransactionPartnerOther;
interface TransactionPartnerAffiliateProgram {
    type: "affiliate_program";
    commission_per_mille: number;
    sponsor_user?: User;
}
interface TransactionPartnerFragment {
    type: "fragment";
    withdrawal_state?: RevenueWithdrawalState;
}
interface TransactionPartnerOther {
    type: "other";
}
interface TransactionPartnerTelegramAds {
    type: "telegram_ads";
}
interface TransactionPartnerTelegramApi {
    type: "telegram_api";
    request_count: number;
}
interface TransactionPartnerUser {
    type: "user";
    user: User;
    affiliate?: AffiliateInfo;
    invoice_payload?: string;
    subscription_period?: number;
    paid_media?: PaidMedia[];
    paid_media_payload?: string;
    gift?: Gift;
}
interface Update {
    update_id: number;
    message?: Message;
    edited_message?: Message;
    channel_post?: Message;
    edited_channel_post?: Message;
    business_connection?: BusinessConnection;
    business_message?: Message;
    edited_business_message?: Message;
    deleted_business_messages?: BusinessMessagesDeleted;
    message_reaction?: MessageReactionUpdated;
    message_reaction_count?: MessageReactionCountUpdated;
    inline_query?: InlineQuery;
    chosen_inline_result?: ChosenInlineResult;
    callback_query?: CallbackQuery;
    shipping_query?: ShippingQuery;
    pre_checkout_query?: PreCheckoutQuery;
    purchased_paid_media?: PaidMediaPurchased;
    poll?: Poll;
    poll_answer?: PollAnswer;
    my_chat_member?: ChatMemberUpdated;
    chat_member?: ChatMemberUpdated;
    chat_join_request?: ChatJoinRequest;
    chat_boost?: ChatBoostUpdated;
    removed_chat_boost?: ChatBoostRemoved;
}
interface User {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    added_to_attachment_menu?: boolean;
    can_join_groups?: boolean;
    can_read_all_group_messages?: boolean;
    supports_inline_queries?: boolean;
    can_connect_to_business?: boolean;
    has_main_web_app?: boolean;
}
interface UserChatBoosts {
    boosts: ChatBoost[];
}
interface UserProfilePhotos {
    total_count: number;
    photos: PhotoSize[][];
}
interface UsersShared {
    request_id: number;
    users: SharedUser[];
}
interface Venue {
    location: Location;
    title: string;
    address: string;
    foursquare_id?: string;
    foursquare_type?: string;
    google_place_id?: string;
    google_place_type?: string;
}
interface Video {
    file_id: string;
    file_unique_id: string;
    width: number;
    height: number;
    duration: number;
    thumbnail?: PhotoSize;
    file_name?: string;
    mime_type?: string;
    file_size?: number;
}
interface VideoChatEnded {
    duration: number;
}
interface VideoChatParticipantsInvited {
    users: User[];
}
interface VideoChatScheduled {
    start_date: number;
}
type VideoChatStarted = never;
interface VideoNote {
    file_id: string;
    file_unique_id: string;
    length: number;
    duration: number;
    thumbnail?: PhotoSize;
    file_size?: number;
}
interface Voice {
    file_id: string;
    file_unique_id: string;
    duration: number;
    mime_type?: string;
    file_size?: number;
}
interface WebAppData {
    data: string;
    button_text: string;
}
interface WebAppInfo {
    url: string;
}
interface WebhookInfo {
    url: string;
    has_custom_certificate: boolean;
    pending_update_count: number;
    ip_address?: string;
    last_error_date?: number;
    last_error_message?: string;
    last_synchronization_error_date?: number;
    max_connections?: number;
    allowed_updates?: string[];
}
interface WriteAccessAllowed {
    from_request?: boolean;
    web_app_name?: string;
    from_attachment_menu?: boolean;
}

interface Api {
    add_sticker_to_set(_: AddStickerToSetInput): boolean;
    answer_callback_query(_: AnswerCallbackQueryInput): boolean;
    answer_inline_query(_: AnswerInlineQueryInput): boolean;
    answer_pre_checkout_query(_: AnswerPreCheckoutQueryInput): boolean;
    answer_shipping_query(_: AnswerShippingQueryInput): boolean;
    answer_web_app_query(_: AnswerWebAppQueryInput): SentWebAppMessage;
    approve_chat_join_request(_: ApproveChatJoinRequestInput): boolean;
    ban_chat_member(_: BanChatMemberInput): boolean;
    ban_chat_sender_chat(_: BanChatSenderChatInput): boolean;
    close(_: CloseInput): boolean;
    close_forum_topic(_: CloseForumTopicInput): boolean;
    close_general_forum_topic(_: CloseGeneralForumTopicInput): boolean;
    copy_message(_: CopyMessageInput): MessageId;
    copy_messages(_: CopyMessagesInput): MessageId[];
    create_chat_invite_link(_: CreateChatInviteLinkInput): ChatInviteLink;
    create_chat_subscription_invite_link(_: CreateChatSubscriptionInviteLinkInput): ChatInviteLink;
    create_forum_topic(_: CreateForumTopicInput): ForumTopic;
    create_invoice_link(_: CreateInvoiceLinkInput): string;
    create_new_sticker_set(_: CreateNewStickerSetInput): boolean;
    decline_chat_join_request(_: DeclineChatJoinRequestInput): boolean;
    delete_chat_photo(_: DeleteChatPhotoInput): boolean;
    delete_chat_sticker_set(_: DeleteChatStickerSetInput): boolean;
    delete_forum_topic(_: DeleteForumTopicInput): boolean;
    delete_message(_: DeleteMessageInput): boolean;
    delete_messages(_: DeleteMessagesInput): boolean;
    delete_my_commands(_: DeleteMyCommandsInput): boolean;
    delete_sticker_from_set(_: DeleteStickerFromSetInput): boolean;
    delete_sticker_set(_: DeleteStickerSetInput): boolean;
    delete_webhook(_: DeleteWebhookInput): boolean;
    edit_chat_invite_link(_: EditChatInviteLinkInput): ChatInviteLink;
    edit_chat_subscription_invite_link(_: EditChatSubscriptionInviteLinkInput): ChatInviteLink;
    edit_forum_topic(_: EditForumTopicInput): boolean;
    edit_general_forum_topic(_: EditGeneralForumTopicInput): boolean;
    edit_message_caption(_: EditMessageCaptionInput): Message | boolean;
    edit_message_live_location(_: EditMessageLiveLocationInput): Message | boolean;
    edit_message_media(_: EditMessageMediaInput): Message | boolean;
    edit_message_reply_markup(_: EditMessageReplyMarkupInput): Message | boolean;
    edit_message_text(_: EditMessageTextInput): Message | boolean;
    edit_user_star_subscription(_: EditUserStarSubscriptionInput): boolean;
    export_chat_invite_link(_: ExportChatInviteLinkInput): string;
    forward_message(_: ForwardMessageInput): Message;
    forward_messages(_: ForwardMessagesInput): MessageId[];
    get_available_gifts(_: GetAvailableGiftsInput): Gifts;
    get_business_connection(_: GetBusinessConnectionInput): BusinessConnection;
    get_chat(_: GetChatInput): ChatFullInfo;
    get_chat_administrators(_: GetChatAdministratorsInput): ChatMember[];
    get_chat_member(_: GetChatMemberInput): ChatMember;
    get_chat_member_count(_: GetChatMemberCountInput): number;
    get_chat_menu_button(_: GetChatMenuButtonInput): MenuButton;
    get_custom_emoji_stickers(_: GetCustomEmojiStickersInput): Sticker[];
    get_file(_: GetFileInput): File$1;
    get_forum_topic_icon_stickers(_: GetForumTopicIconStickersInput): Sticker[];
    get_game_high_scores(_: GetGameHighScoresInput): GameHighScore[];
    get_me(_: GetMeInput): User;
    get_my_commands(_: GetMyCommandsInput): BotCommand[];
    get_my_default_administrator_rights(_: GetMyDefaultAdministratorRightsInput): ChatAdministratorRights;
    get_my_description(_: GetMyDescriptionInput): BotDescription;
    get_my_name(_: GetMyNameInput): BotName;
    get_my_short_description(_: GetMyShortDescriptionInput): BotShortDescription;
    get_star_transactions(_: GetStarTransactionsInput): StarTransactions;
    get_sticker_set(_: GetStickerSetInput): StickerSet;
    get_updates(_: GetUpdatesInput): Update[];
    get_user_chat_boosts(_: GetUserChatBoostsInput): UserChatBoosts;
    get_user_profile_photos(_: GetUserProfilePhotosInput): UserProfilePhotos;
    get_webhook_info(_: GetWebhookInfoInput): WebhookInfo;
    hide_general_forum_topic(_: HideGeneralForumTopicInput): boolean;
    leave_chat(_: LeaveChatInput): boolean;
    log_out(_: LogOutInput): boolean;
    pin_chat_message(_: PinChatMessageInput): boolean;
    promote_chat_member(_: PromoteChatMemberInput): boolean;
    refund_star_payment(_: RefundStarPaymentInput): boolean;
    reopen_forum_topic(_: ReopenForumTopicInput): boolean;
    reopen_general_forum_topic(_: ReopenGeneralForumTopicInput): boolean;
    replace_sticker_in_set(_: ReplaceStickerInSetInput): boolean;
    restrict_chat_member(_: RestrictChatMemberInput): boolean;
    revoke_chat_invite_link(_: RevokeChatInviteLinkInput): ChatInviteLink;
    save_prepared_inline_message(_: SavePreparedInlineMessageInput): PreparedInlineMessage;
    send_animation(_: SendAnimationInput): Message;
    send_audio(_: SendAudioInput): Message;
    send_chat_action(_: SendChatActionInput): boolean;
    send_contact(_: SendContactInput): Message;
    send_dice(_: SendDiceInput): Message;
    send_document(_: SendDocumentInput): Message;
    send_game(_: SendGameInput): Message;
    send_gift(_: SendGiftInput): boolean;
    send_invoice(_: SendInvoiceInput): Message;
    send_location(_: SendLocationInput): Message;
    send_media_group(_: SendMediaGroupInput): Message[];
    send_message(_: SendMessageInput): Message;
    send_paid_media(_: SendPaidMediaInput): Message;
    send_photo(_: SendPhotoInput): Message;
    send_poll(_: SendPollInput): Message;
    send_sticker(_: SendStickerInput): Message;
    send_venue(_: SendVenueInput): Message;
    send_video(_: SendVideoInput): Message;
    send_video_note(_: SendVideoNoteInput): Message;
    send_voice(_: SendVoiceInput): Message;
    set_chat_administrator_custom_title(_: SetChatAdministratorCustomTitleInput): boolean;
    set_chat_description(_: SetChatDescriptionInput): boolean;
    set_chat_menu_button(_: SetChatMenuButtonInput): boolean;
    set_chat_permissions(_: SetChatPermissionsInput): boolean;
    set_chat_photo(_: SetChatPhotoInput): boolean;
    set_chat_sticker_set(_: SetChatStickerSetInput): boolean;
    set_chat_title(_: SetChatTitleInput): boolean;
    set_custom_emoji_sticker_set_thumbnail(_: SetCustomEmojiStickerSetThumbnailInput): boolean;
    set_game_score(_: SetGameScoreInput): Message | boolean;
    set_message_reaction(_: SetMessageReactionInput): boolean;
    set_my_commands(_: SetMyCommandsInput): boolean;
    set_my_default_administrator_rights(_: SetMyDefaultAdministratorRightsInput): boolean;
    set_my_description(_: SetMyDescriptionInput): boolean;
    set_my_name(_: SetMyNameInput): boolean;
    set_my_short_description(_: SetMyShortDescriptionInput): boolean;
    set_passport_data_errors(_: SetPassportDataErrorsInput): boolean;
    set_sticker_emoji_list(_: SetStickerEmojiListInput): boolean;
    set_sticker_keywords(_: SetStickerKeywordsInput): boolean;
    set_sticker_mask_position(_: SetStickerMaskPositionInput): boolean;
    set_sticker_position_in_set(_: SetStickerPositionInSetInput): boolean;
    set_sticker_set_thumbnail(_: SetStickerSetThumbnailInput): boolean;
    set_sticker_set_title(_: SetStickerSetTitleInput): boolean;
    set_user_emoji_status(_: SetUserEmojiStatusInput): boolean;
    set_webhook(_: SetWebhookInput): boolean;
    stop_message_live_location(_: StopMessageLiveLocationInput): Message | boolean;
    stop_poll(_: StopPollInput): Poll;
    unban_chat_member(_: UnbanChatMemberInput): boolean;
    unban_chat_sender_chat(_: UnbanChatSenderChatInput): boolean;
    unhide_general_forum_topic(_: UnhideGeneralForumTopicInput): boolean;
    unpin_all_chat_messages(_: UnpinAllChatMessagesInput): boolean;
    unpin_all_forum_topic_messages(_: UnpinAllForumTopicMessagesInput): boolean;
    unpin_all_general_forum_topic_messages(_: UnpinAllGeneralForumTopicMessagesInput): boolean;
    unpin_chat_message(_: UnpinChatMessageInput): boolean;
    upload_sticker_file(_: UploadStickerFileInput): File$1;
}
interface AddStickerToSetInput {
    user_id: number;
    name: string;
    sticker: InputSticker;
}
interface AnswerCallbackQueryInput {
    callback_query_id: string;
    text?: string;
    show_alert?: boolean;
    url?: string;
    cache_time?: number;
}
interface AnswerInlineQueryInput {
    inline_query_id: string;
    results: InlineQueryResult[];
    cache_time?: number;
    is_personal?: boolean;
    next_offset?: string;
    button?: InlineQueryResultsButton;
}
interface AnswerPreCheckoutQueryInput {
    pre_checkout_query_id: string;
    ok: boolean;
    error_message?: string;
}
interface AnswerShippingQueryInput {
    shipping_query_id: string;
    ok: boolean;
    shipping_options?: ShippingOption[];
    error_message?: string;
}
interface AnswerWebAppQueryInput {
    web_app_query_id: string;
    result: InlineQueryResult;
}
interface ApproveChatJoinRequestInput {
    chat_id: number | string;
    user_id: number;
}
interface BanChatMemberInput {
    chat_id: number | string;
    user_id: number;
    until_date?: number;
    revoke_messages?: boolean;
}
interface BanChatSenderChatInput {
    chat_id: number | string;
    sender_chat_id: number;
}
interface CloseInput {
}
interface CloseForumTopicInput {
    chat_id: number | string;
    message_thread_id: number;
}
interface CloseGeneralForumTopicInput {
    chat_id: number | string;
}
interface CopyMessageInput {
    chat_id: number | string;
    from_chat_id: number | string;
    message_id: number;
    message_thread_id?: number;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface CopyMessagesInput {
    chat_id: number | string;
    from_chat_id: number | string;
    message_ids: number[];
    message_thread_id?: number;
    disable_notification?: boolean;
    protect_content?: boolean;
    remove_caption?: boolean;
}
interface CreateChatInviteLinkInput {
    chat_id: number | string;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
}
interface CreateChatSubscriptionInviteLinkInput {
    chat_id: number | string;
    subscription_period: number;
    subscription_price: number;
    name?: string;
}
interface CreateForumTopicInput {
    chat_id: number | string;
    name: string;
    icon_color?: number;
    icon_custom_emoji_id?: string;
}
interface CreateInvoiceLinkInput {
    title: string;
    description: string;
    payload: string;
    currency: string;
    prices: LabeledPrice[];
    business_connection_id?: string;
    provider_token?: string;
    subscription_period?: number;
    max_tip_amount?: number;
    suggested_tip_amounts?: number[];
    provider_data?: string;
    photo_url?: string;
    photo_size?: number;
    photo_width?: number;
    photo_height?: number;
    need_name?: boolean;
    need_phone_number?: boolean;
    need_email?: boolean;
    need_shipping_address?: boolean;
    send_phone_number_to_provider?: boolean;
    send_email_to_provider?: boolean;
    is_flexible?: boolean;
}
interface CreateNewStickerSetInput {
    user_id: number;
    name: string;
    title: string;
    stickers: InputSticker[];
    sticker_type?: string;
    needs_repainting?: boolean;
}
interface DeclineChatJoinRequestInput {
    chat_id: number | string;
    user_id: number;
}
interface DeleteChatPhotoInput {
    chat_id: number | string;
}
interface DeleteChatStickerSetInput {
    chat_id: number | string;
}
interface DeleteForumTopicInput {
    chat_id: number | string;
    message_thread_id: number;
}
interface DeleteMessageInput {
    chat_id: number | string;
    message_id: number;
}
interface DeleteMessagesInput {
    chat_id: number | string;
    message_ids: number[];
}
interface DeleteMyCommandsInput {
    scope?: BotCommandScope;
    language_code?: string;
}
interface DeleteStickerFromSetInput {
    sticker: string;
}
interface DeleteStickerSetInput {
    name: string;
}
interface DeleteWebhookInput {
    drop_pending_updates?: boolean;
}
interface EditChatInviteLinkInput {
    chat_id: number | string;
    invite_link: string;
    name?: string;
    expire_date?: number;
    member_limit?: number;
    creates_join_request?: boolean;
}
interface EditChatSubscriptionInviteLinkInput {
    chat_id: number | string;
    invite_link: string;
    name?: string;
}
interface EditForumTopicInput {
    chat_id: number | string;
    message_thread_id: number;
    name?: string;
    icon_custom_emoji_id?: string;
}
interface EditGeneralForumTopicInput {
    chat_id: number | string;
    name: string;
}
interface EditMessageCaptionInput {
    business_connection_id?: string;
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    reply_markup?: InlineKeyboardMarkup;
}
interface EditMessageLiveLocationInput {
    latitude: number;
    longitude: number;
    business_connection_id?: string;
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    live_period?: number;
    horizontal_accuracy?: number;
    heading?: number;
    proximity_alert_radius?: number;
    reply_markup?: InlineKeyboardMarkup;
}
interface EditMessageMediaInput {
    media: InputMedia;
    business_connection_id?: string;
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    reply_markup?: InlineKeyboardMarkup;
}
interface EditMessageReplyMarkupInput {
    business_connection_id?: string;
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    reply_markup?: InlineKeyboardMarkup;
}
interface EditMessageTextInput {
    text: string;
    business_connection_id?: string;
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    entities?: MessageEntity[];
    link_preview_options?: LinkPreviewOptions;
    reply_markup?: InlineKeyboardMarkup;
}
interface EditUserStarSubscriptionInput {
    user_id: number;
    telegram_payment_charge_id: string;
    is_canceled: boolean;
}
interface ExportChatInviteLinkInput {
    chat_id: number | string;
}
interface ForwardMessageInput {
    chat_id: number | string;
    from_chat_id: number | string;
    message_id: number;
    message_thread_id?: number;
    disable_notification?: boolean;
    protect_content?: boolean;
}
interface ForwardMessagesInput {
    chat_id: number | string;
    from_chat_id: number | string;
    message_ids: number[];
    message_thread_id?: number;
    disable_notification?: boolean;
    protect_content?: boolean;
}
interface GetAvailableGiftsInput {
}
interface GetBusinessConnectionInput {
    business_connection_id: string;
}
interface GetChatInput {
    chat_id: number | string;
}
interface GetChatAdministratorsInput {
    chat_id: number | string;
}
interface GetChatMemberInput {
    chat_id: number | string;
    user_id: number;
}
interface GetChatMemberCountInput {
    chat_id: number | string;
}
interface GetChatMenuButtonInput {
    chat_id?: number;
}
interface GetCustomEmojiStickersInput {
    custom_emoji_ids: string[];
}
interface GetFileInput {
    file_id: string;
}
interface GetForumTopicIconStickersInput {
}
interface GetGameHighScoresInput {
    user_id: number;
    chat_id?: number;
    message_id?: number;
    inline_message_id?: string;
}
interface GetMeInput {
}
interface GetMyCommandsInput {
    scope?: BotCommandScope;
    language_code?: string;
}
interface GetMyDefaultAdministratorRightsInput {
    for_channels?: boolean;
}
interface GetMyDescriptionInput {
    language_code?: string;
}
interface GetMyNameInput {
    language_code?: string;
}
interface GetMyShortDescriptionInput {
    language_code?: string;
}
interface GetStarTransactionsInput {
    offset?: number;
    limit?: number;
}
interface GetStickerSetInput {
    name: string;
}
interface GetUpdatesInput {
    offset?: number;
    limit?: number;
    timeout?: number;
    allowed_updates?: string[];
}
interface GetUserChatBoostsInput {
    chat_id: number | string;
    user_id: number;
}
interface GetUserProfilePhotosInput {
    user_id: number;
    offset?: number;
    limit?: number;
}
interface GetWebhookInfoInput {
}
interface HideGeneralForumTopicInput {
    chat_id: number | string;
}
interface LeaveChatInput {
    chat_id: number | string;
}
interface LogOutInput {
}
interface PinChatMessageInput {
    chat_id: number | string;
    message_id: number;
    business_connection_id?: string;
    disable_notification?: boolean;
}
interface PromoteChatMemberInput {
    chat_id: number | string;
    user_id: number;
    is_anonymous?: boolean;
    can_manage_chat?: boolean;
    can_delete_messages?: boolean;
    can_manage_video_chats?: boolean;
    can_restrict_members?: boolean;
    can_promote_members?: boolean;
    can_change_info?: boolean;
    can_invite_users?: boolean;
    can_post_stories?: boolean;
    can_edit_stories?: boolean;
    can_delete_stories?: boolean;
    can_post_messages?: boolean;
    can_edit_messages?: boolean;
    can_pin_messages?: boolean;
    can_manage_topics?: boolean;
}
interface RefundStarPaymentInput {
    user_id: number;
    telegram_payment_charge_id: string;
}
interface ReopenForumTopicInput {
    chat_id: number | string;
    message_thread_id: number;
}
interface ReopenGeneralForumTopicInput {
    chat_id: number | string;
}
interface ReplaceStickerInSetInput {
    user_id: number;
    name: string;
    old_sticker: string;
    sticker: InputSticker;
}
interface RestrictChatMemberInput {
    chat_id: number | string;
    user_id: number;
    permissions: ChatPermissions;
    use_independent_chat_permissions?: boolean;
    until_date?: number;
}
interface RevokeChatInviteLinkInput {
    chat_id: number | string;
    invite_link: string;
}
interface SavePreparedInlineMessageInput {
    user_id: number;
    result: InlineQueryResult;
    allow_user_chats?: boolean;
    allow_bot_chats?: boolean;
    allow_group_chats?: boolean;
    allow_channel_chats?: boolean;
}
interface SendAnimationInput {
    chat_id: number | string;
    animation: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    duration?: number;
    width?: number;
    height?: number;
    thumbnail?: InputFile | string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    has_spoiler?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendAudioInput {
    chat_id: number | string;
    audio: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    duration?: number;
    performer?: string;
    title?: string;
    thumbnail?: InputFile | string;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendChatActionInput {
    chat_id: number | string;
    action: string;
    business_connection_id?: string;
    message_thread_id?: number;
}
interface SendContactInput {
    chat_id: number | string;
    phone_number: string;
    first_name: string;
    business_connection_id?: string;
    message_thread_id?: number;
    last_name?: string;
    vcard?: string;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendDiceInput {
    chat_id: number | string;
    business_connection_id?: string;
    message_thread_id?: number;
    emoji?: "🎲" | "🎯" | "🏀" | "⚽" | "🎳" | "🎰";
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendDocumentInput {
    chat_id: number | string;
    document: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    thumbnail?: InputFile | string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    disable_content_type_detection?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendGameInput {
    chat_id: number;
    game_short_name: string;
    business_connection_id?: string;
    message_thread_id?: number;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup;
}
interface SendGiftInput {
    user_id: number;
    gift_id: string;
    text?: string;
    text_parse_mode?: "HTML" | "MarkdownV2";
    text_entities?: MessageEntity[];
}
interface SendInvoiceInput {
    chat_id: number | string;
    title: string;
    description: string;
    payload: string;
    currency: string;
    prices: LabeledPrice[];
    message_thread_id?: number;
    provider_token?: string;
    max_tip_amount?: number;
    suggested_tip_amounts?: number[];
    start_parameter?: string;
    provider_data?: string;
    photo_url?: string;
    photo_size?: number;
    photo_width?: number;
    photo_height?: number;
    need_name?: boolean;
    need_phone_number?: boolean;
    need_email?: boolean;
    need_shipping_address?: boolean;
    send_phone_number_to_provider?: boolean;
    send_email_to_provider?: boolean;
    is_flexible?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup;
}
interface SendLocationInput {
    chat_id: number | string;
    latitude: number;
    longitude: number;
    business_connection_id?: string;
    message_thread_id?: number;
    horizontal_accuracy?: number;
    live_period?: number;
    heading?: number;
    proximity_alert_radius?: number;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendMediaGroupInput {
    chat_id: number | string;
    media: (InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo)[];
    business_connection_id?: string;
    message_thread_id?: number;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
}
interface SendMessageInput {
    chat_id: number | string;
    text: string;
    business_connection_id?: string;
    message_thread_id?: number;
    parse_mode?: "HTML" | "MarkdownV2";
    entities?: MessageEntity[];
    link_preview_options?: LinkPreviewOptions;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendPaidMediaInput {
    chat_id: number | string;
    star_count: number;
    media: InputPaidMedia[];
    business_connection_id?: string;
    payload?: string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendPhotoInput {
    chat_id: number | string;
    photo: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    has_spoiler?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendPollInput {
    chat_id: number | string;
    question: string;
    options: InputPollOption[];
    business_connection_id?: string;
    message_thread_id?: number;
    question_parse_mode?: "HTML" | "MarkdownV2";
    question_entities?: MessageEntity[];
    is_anonymous?: boolean;
    type?: string;
    allows_multiple_answers?: boolean;
    correct_option_id?: number;
    explanation?: string;
    explanation_parse_mode?: "HTML" | "MarkdownV2";
    explanation_entities?: MessageEntity[];
    open_period?: number;
    close_date?: number;
    is_closed?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendStickerInput {
    chat_id: number | string;
    sticker: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    emoji?: string;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendVenueInput {
    chat_id: number | string;
    latitude: number;
    longitude: number;
    title: string;
    address: string;
    business_connection_id?: string;
    message_thread_id?: number;
    foursquare_id?: string;
    foursquare_type?: string;
    google_place_id?: string;
    google_place_type?: string;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendVideoInput {
    chat_id: number | string;
    video: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    duration?: number;
    width?: number;
    height?: number;
    thumbnail?: InputFile | string;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    has_spoiler?: boolean;
    supports_streaming?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendVideoNoteInput {
    chat_id: number | string;
    video_note: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    duration?: number;
    length?: number;
    thumbnail?: InputFile | string;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SendVoiceInput {
    chat_id: number | string;
    voice: InputFile | string;
    business_connection_id?: string;
    message_thread_id?: number;
    caption?: string;
    parse_mode?: "HTML" | "MarkdownV2";
    caption_entities?: MessageEntity[];
    duration?: number;
    disable_notification?: boolean;
    protect_content?: boolean;
    allow_paid_broadcast?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
interface SetChatAdministratorCustomTitleInput {
    chat_id: number | string;
    user_id: number;
    custom_title: string;
}
interface SetChatDescriptionInput {
    chat_id: number | string;
    description?: string;
}
interface SetChatMenuButtonInput {
    chat_id?: number;
    menu_button?: MenuButton;
}
interface SetChatPermissionsInput {
    chat_id: number | string;
    permissions: ChatPermissions;
    use_independent_chat_permissions?: boolean;
}
interface SetChatPhotoInput {
    chat_id: number | string;
    photo: InputFile;
}
interface SetChatStickerSetInput {
    chat_id: number | string;
    sticker_set_name: string;
}
interface SetChatTitleInput {
    chat_id: number | string;
    title: string;
}
interface SetCustomEmojiStickerSetThumbnailInput {
    name: string;
    custom_emoji_id?: string;
}
interface SetGameScoreInput {
    user_id: number;
    score: number;
    force?: boolean;
    disable_edit_message?: boolean;
    chat_id?: number;
    message_id?: number;
    inline_message_id?: string;
}
interface SetMessageReactionInput {
    chat_id: number | string;
    message_id: number;
    reaction?: ReactionType[];
    is_big?: boolean;
}
interface SetMyCommandsInput {
    commands: BotCommand[];
    scope?: BotCommandScope;
    language_code?: string;
}
interface SetMyDefaultAdministratorRightsInput {
    rights?: ChatAdministratorRights;
    for_channels?: boolean;
}
interface SetMyDescriptionInput {
    description?: string;
    language_code?: string;
}
interface SetMyNameInput {
    name?: string;
    language_code?: string;
}
interface SetMyShortDescriptionInput {
    short_description?: string;
    language_code?: string;
}
interface SetPassportDataErrorsInput {
    user_id: number;
    errors: PassportElementError[];
}
interface SetStickerEmojiListInput {
    sticker: string;
    emoji_list: string[];
}
interface SetStickerKeywordsInput {
    sticker: string;
    keywords?: string[];
}
interface SetStickerMaskPositionInput {
    sticker: string;
    mask_position?: MaskPosition;
}
interface SetStickerPositionInSetInput {
    sticker: string;
    position: number;
}
interface SetStickerSetThumbnailInput {
    name: string;
    user_id: number;
    format: "static" | "animated" | "video";
    thumbnail?: InputFile | string;
}
interface SetStickerSetTitleInput {
    name: string;
    title: string;
}
interface SetUserEmojiStatusInput {
    user_id: number;
    emoji_status_custom_emoji_id?: string;
    emoji_status_expiration_date?: number;
}
interface SetWebhookInput {
    url: string;
    certificate?: InputFile;
    ip_address?: string;
    max_connections?: number;
    allowed_updates?: string[];
    drop_pending_updates?: boolean;
    secret_token?: string;
}
interface StopMessageLiveLocationInput {
    business_connection_id?: string;
    chat_id?: number | string;
    message_id?: number;
    inline_message_id?: string;
    reply_markup?: InlineKeyboardMarkup;
}
interface StopPollInput {
    chat_id: number | string;
    message_id: number;
    business_connection_id?: string;
    reply_markup?: InlineKeyboardMarkup;
}
interface UnbanChatMemberInput {
    chat_id: number | string;
    user_id: number;
    only_if_banned?: boolean;
}
interface UnbanChatSenderChatInput {
    chat_id: number | string;
    sender_chat_id: number;
}
interface UnhideGeneralForumTopicInput {
    chat_id: number | string;
}
interface UnpinAllChatMessagesInput {
    chat_id: number | string;
}
interface UnpinAllForumTopicMessagesInput {
    chat_id: number | string;
    message_thread_id: number;
}
interface UnpinAllGeneralForumTopicMessagesInput {
    chat_id: number | string;
}
interface UnpinChatMessageInput {
    chat_id: number | string;
    business_connection_id?: string;
    message_id?: number;
}
interface UploadStickerFileInput {
    user_id: number;
    sticker: InputFile;
    sticker_format: "static" | "animated" | "video";
}

type ClientExecuteRequestServiceInterface = Micro.Micro.Success<typeof ClientExecuteRequestServiceDefault>;
declare const ClientExecuteRequestServiceDefault: Micro.Micro<{
    readonly execute: <M extends keyof Api>(method: M, input: Parameters<Api[M]>[0]) => Micro.Micro<ReturnType<Api[M]>, TgBotClientError, never>;
}, never, TgBotClientConfig>;

declare const getFile: (fileId: string, config: TgBotClientConfigObject, execute: ClientExecuteRequestServiceInterface) => Micro.Micro<File, TgBotClientError>;

type ClientFileServiceInterface = Context.Tag.Service<typeof ClientFileService>;
declare const ClientFileService_base: Context.TagClass<ClientFileService, "ClientFileService", {
    getFile: (input: {
        file_id: string;
    }) => ReturnType<typeof getFile>;
}>;
declare class ClientFileService extends ClientFileService_base {
}

type TgBotClient = ReturnType<typeof makeTgBotClient>;
declare const makeTgBotClient: (input: TgBotClientSettingsInput) => {
    execute: <M extends keyof Api>(method: M, input: Parameters<Api[M]>[0]) => Promise<ReturnType<Api[M]>>;
    getFile: (input: Parameters<ClientFileServiceInterface["getFile"]>[0]) => Promise<File>;
};

type AvailableUpdateTypes = Exclude<keyof Update, 'update_id'>;
type BotResponse = {
    [K in keyof Api]: K extends `send_${infer R}` ? {
        type: Lowercase<R>;
    } & Omit<Parameters<Api[K]>[0], 'chat_id'> : never;
}[keyof Api];
type BotMessageHandlers = {
    [K in AvailableUpdateTypes as `on_${K}`]?: (update: NonNullable<Update[K]>) => BotResponse;
};
type BotMessageHandlerSettings = {
    readonly batch_size?: number;
    readonly timeout?: number;
    readonly max_empty_responses?: number;
} & BotMessageHandlers;

type RunBotInput = ({
    type: "fromJsonFile";
} | {
    type: "config";
} & TgBotClientSettingsInput) & BotMessageHandlerSettings;
declare const BotFactoryServiceDefault: {
    makeBot: (messageHandler: BotMessageHandlerSettings) => Micro.Micro<Micro.MicroFiber<{
        updates: Update[];
        lastSuccessId: number | undefined;
        hasError: boolean;
    }, TgBotClientError>, string, TgBotClientConfig>;
    runBot: (input: RunBotInput) => Micro.Micro<Micro.MicroFiber<{
        updates: Update[];
        lastSuccessId: number | undefined;
        hasError: boolean;
    }, TgBotClientError>, string, never>;
};

declare const runTgChatBot: (input: Parameters<typeof BotFactoryServiceDefault.runBot>[0]) => Promise<Micro$1.MicroFiber<{
    updates: Update[];
    lastSuccessId: number | undefined;
    hasError: boolean;
}, TgBotClientError>>;

declare const defaultBaseUrl = "https://api.telegram.org";
declare const MESSAGE_EFFECTS: {
    readonly "\uD83D\uDD25": "5104841245755180586";
    readonly "\uD83D\uDC4D": "5107584321108051014";
    readonly "\uD83D\uDC4E": "5104858069142078462";
    readonly "\u2764\uFE0F": "5159385139981059251";
    readonly "\uD83C\uDF89": "5046509860389126442";
    readonly "\uD83D\uDCA9": "5046589136895476101";
};
type MessageEffect = keyof typeof MESSAGE_EFFECTS;
declare const messageEffectIdCodes: MessageEffect[];
declare const isMessageEffect: (input: unknown) => input is MessageEffect;

export { type AddStickerToSetInput, type AffiliateInfo, type Animation, type AnswerCallbackQueryInput, type AnswerInlineQueryInput, type AnswerPreCheckoutQueryInput, type AnswerShippingQueryInput, type AnswerWebAppQueryInput, type Api, type ApproveChatJoinRequestInput, type Audio, type AvailableUpdateTypes, type BackgroundFill, type BackgroundFillFreeformGradient, type BackgroundFillGradient, type BackgroundFillSolid, type BackgroundType, type BackgroundTypeChatTheme, type BackgroundTypeFill, type BackgroundTypePattern, type BackgroundTypeWallpaper, type BanChatMemberInput, type BanChatSenderChatInput, type Birthdate, type BotCommand, type BotCommandScope, type BotCommandScopeAllChatAdministrators, type BotCommandScopeAllGroupChats, type BotCommandScopeAllPrivateChats, type BotCommandScopeChat, type BotCommandScopeChatAdministrators, type BotCommandScopeChatMember, type BotCommandScopeDefault, type BotDescription, type BotMessageHandlerSettings, type BotMessageHandlers, type BotName, type BotResponse, type BotShortDescription, type BusinessConnection, type BusinessIntro, type BusinessLocation, type BusinessMessagesDeleted, type BusinessOpeningHours, type BusinessOpeningHoursInterval, type CallbackGame, type CallbackQuery, type Chat, type ChatAdministratorRights, type ChatBackground, type ChatBoost, type ChatBoostAdded, type ChatBoostRemoved, type ChatBoostSource, type ChatBoostSourceGiftCode, type ChatBoostSourceGiveaway, type ChatBoostSourcePremium, type ChatBoostUpdated, type ChatFullInfo, type ChatInviteLink, type ChatJoinRequest, type ChatLocation, type ChatMember, type ChatMemberAdministrator, type ChatMemberBanned, type ChatMemberLeft, type ChatMemberMember, type ChatMemberOwner, type ChatMemberRestricted, type ChatMemberUpdated, type ChatPermissions, type ChatPhoto, type ChatShared, type ChosenInlineResult, type CloseForumTopicInput, type CloseGeneralForumTopicInput, type CloseInput, type Contact, type CopyMessageInput, type CopyMessagesInput, type CopyTextButton, type CreateChatInviteLinkInput, type CreateChatSubscriptionInviteLinkInput, type CreateForumTopicInput, type CreateInvoiceLinkInput, type CreateNewStickerSetInput, type DeclineChatJoinRequestInput, type DeleteChatPhotoInput, type DeleteChatStickerSetInput, type DeleteForumTopicInput, type DeleteMessageInput, type DeleteMessagesInput, type DeleteMyCommandsInput, type DeleteStickerFromSetInput, type DeleteStickerSetInput, type DeleteWebhookInput, type Dice, type Document, type EditChatInviteLinkInput, type EditChatSubscriptionInviteLinkInput, type EditForumTopicInput, type EditGeneralForumTopicInput, type EditMessageCaptionInput, type EditMessageLiveLocationInput, type EditMessageMediaInput, type EditMessageReplyMarkupInput, type EditMessageTextInput, type EditUserStarSubscriptionInput, type EncryptedCredentials, type EncryptedPassportElement, type ExportChatInviteLinkInput, type ExternalReplyInfo, type File$1 as File, type ForceReply, type ForumTopic, type ForumTopicClosed, type ForumTopicCreated, type ForumTopicEdited, type ForumTopicReopened, type ForwardMessageInput, type ForwardMessagesInput, type Game, type GameHighScore, type GeneralForumTopicHidden, type GeneralForumTopicUnhidden, type GetAvailableGiftsInput, type GetBusinessConnectionInput, type GetChatAdministratorsInput, type GetChatInput, type GetChatMemberCountInput, type GetChatMemberInput, type GetChatMenuButtonInput, type GetCustomEmojiStickersInput, type GetFileInput, type GetForumTopicIconStickersInput, type GetGameHighScoresInput, type GetMeInput, type GetMyCommandsInput, type GetMyDefaultAdministratorRightsInput, type GetMyDescriptionInput, type GetMyNameInput, type GetMyShortDescriptionInput, type GetStarTransactionsInput, type GetStickerSetInput, type GetUpdatesInput, type GetUserChatBoostsInput, type GetUserProfilePhotosInput, type GetWebhookInfoInput, type Gift, type Gifts, type Giveaway, type GiveawayCompleted, type GiveawayCreated, type GiveawayWinners, type HideGeneralForumTopicInput, type InaccessibleMessage, type InlineKeyboardButton, type InlineKeyboardMarkup, type InlineQuery, type InlineQueryResult, type InlineQueryResultArticle, type InlineQueryResultAudio, type InlineQueryResultCachedAudio, type InlineQueryResultCachedDocument, type InlineQueryResultCachedGif, type InlineQueryResultCachedMpeg4Gif, type InlineQueryResultCachedPhoto, type InlineQueryResultCachedSticker, type InlineQueryResultCachedVideo, type InlineQueryResultCachedVoice, type InlineQueryResultContact, type InlineQueryResultDocument, type InlineQueryResultGame, type InlineQueryResultGif, type InlineQueryResultLocation, type InlineQueryResultMpeg4Gif, type InlineQueryResultPhoto, type InlineQueryResultVenue, type InlineQueryResultVideo, type InlineQueryResultVoice, type InlineQueryResultsButton, type InputContactMessageContent, type InputFile, type InputInvoiceMessageContent, type InputLocationMessageContent, type InputMedia, type InputMediaAnimation, type InputMediaAudio, type InputMediaDocument, type InputMediaPhoto, type InputMediaVideo, type InputMessageContent, type InputPaidMedia, type InputPaidMediaPhoto, type InputPaidMediaVideo, type InputPollOption, type InputSticker, type InputTextMessageContent, type InputVenueMessageContent, type Invoice, type KeyboardButton, type KeyboardButtonPollType, type KeyboardButtonRequestChat, type KeyboardButtonRequestUsers, type LabeledPrice, type LeaveChatInput, type LinkPreviewOptions, type Location, type LogOutInput, type LoginUrl, MESSAGE_EFFECTS, type MaskPosition, type MaybeInaccessibleMessage, type MenuButton, type MenuButtonCommands, type MenuButtonDefault, type MenuButtonWebApp, type Message, type MessageAutoDeleteTimerChanged, type MessageEffect, type MessageEntity, type MessageId, type MessageOrigin, type MessageOriginChannel, type MessageOriginChat, type MessageOriginHiddenUser, type MessageOriginUser, type MessageReactionCountUpdated, type MessageReactionUpdated, type OrderInfo, type PaidMedia, type PaidMediaInfo, type PaidMediaPhoto, type PaidMediaPreview, type PaidMediaPurchased, type PaidMediaVideo, type PassportData, type PassportElementError, type PassportElementErrorDataField, type PassportElementErrorFile, type PassportElementErrorFiles, type PassportElementErrorFrontSide, type PassportElementErrorReverseSide, type PassportElementErrorSelfie, type PassportElementErrorTranslationFile, type PassportElementErrorTranslationFiles, type PassportElementErrorUnspecified, type PassportFile, type PhotoSize, type PinChatMessageInput, type Poll, type PollAnswer, type PollOption, type PreCheckoutQuery, type PreparedInlineMessage, type PromoteChatMemberInput, type ProximityAlertTriggered, type ReactionCount, type ReactionType, type ReactionTypeCustomEmoji, type ReactionTypeEmoji, type ReactionTypePaid, type RefundStarPaymentInput, type RefundedPayment, type ReopenForumTopicInput, type ReopenGeneralForumTopicInput, type ReplaceStickerInSetInput, type ReplyKeyboardMarkup, type ReplyKeyboardRemove, type ReplyParameters, type ResponseParameters, type RestrictChatMemberInput, type RevenueWithdrawalState, type RevenueWithdrawalStateFailed, type RevenueWithdrawalStatePending, type RevenueWithdrawalStateSucceeded, type RevokeChatInviteLinkInput, type SavePreparedInlineMessageInput, type SendAnimationInput, type SendAudioInput, type SendChatActionInput, type SendContactInput, type SendDiceInput, type SendDocumentInput, type SendGameInput, type SendGiftInput, type SendInvoiceInput, type SendLocationInput, type SendMediaGroupInput, type SendMessageInput, type SendPaidMediaInput, type SendPhotoInput, type SendPollInput, type SendStickerInput, type SendVenueInput, type SendVideoInput, type SendVideoNoteInput, type SendVoiceInput, type SentWebAppMessage, type SetChatAdministratorCustomTitleInput, type SetChatDescriptionInput, type SetChatMenuButtonInput, type SetChatPermissionsInput, type SetChatPhotoInput, type SetChatStickerSetInput, type SetChatTitleInput, type SetCustomEmojiStickerSetThumbnailInput, type SetGameScoreInput, type SetMessageReactionInput, type SetMyCommandsInput, type SetMyDefaultAdministratorRightsInput, type SetMyDescriptionInput, type SetMyNameInput, type SetMyShortDescriptionInput, type SetPassportDataErrorsInput, type SetStickerEmojiListInput, type SetStickerKeywordsInput, type SetStickerMaskPositionInput, type SetStickerPositionInSetInput, type SetStickerSetThumbnailInput, type SetStickerSetTitleInput, type SetUserEmojiStatusInput, type SetWebhookInput, type SharedUser, type ShippingAddress, type ShippingOption, type ShippingQuery, type StarTransaction, type StarTransactions, type Sticker, type StickerSet, type StopMessageLiveLocationInput, type StopPollInput, type Story, type SuccessfulPayment, type SwitchInlineQueryChosenChat, type TextQuote, type TgBotClient, type TransactionPartner, type TransactionPartnerAffiliateProgram, type TransactionPartnerFragment, type TransactionPartnerOther, type TransactionPartnerTelegramAds, type TransactionPartnerTelegramApi, type TransactionPartnerUser, type UnbanChatMemberInput, type UnbanChatSenderChatInput, type UnhideGeneralForumTopicInput, type UnpinAllChatMessagesInput, type UnpinAllForumTopicMessagesInput, type UnpinAllGeneralForumTopicMessagesInput, type UnpinChatMessageInput, type Update, type UploadStickerFileInput, type User, type UserChatBoosts, type UserProfilePhotos, type UsersShared, type Venue, type Video, type VideoChatEnded, type VideoChatParticipantsInvited, type VideoChatScheduled, type VideoChatStarted, type VideoNote, type Voice, type WebAppData, type WebAppInfo, type WebhookInfo, type WriteAccessAllowed, defaultBaseUrl, isMessageEffect, makeTgBotClient, messageEffectIdCodes, runTgChatBot };
