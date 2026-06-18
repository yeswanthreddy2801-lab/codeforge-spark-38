export interface LbUser {
  rank: number;
  username: string;
  avatar: string;
  problemsSolved: number;
  score: number;
  streak: number;
  accuracy: number;
  country: string;
  flag: string;
}

const NAMES = [
  "alex_codes", "ninja_dev", "matrix_master", "byte_witch", "algo_ace", "quantum_lee",
  "stack_overflow", "binary_bard", "lambda_lady", "null_pointer", "recursion_rex",
  "heap_hero", "graph_guru", "tree_tamer", "loop_lord", "hash_hunter", "dp_dragon",
  "greedy_gal", "queue_queen", "syntax_sage", "kernel_kid", "merge_master", "pivot_pro",
  "bit_bender", "cache_caster", "thread_thane", "logic_lynx", "syntax_storm",
  "buffer_baron", "vector_viper", "matrix_mage", "scope_scout", "delta_dev",
  "pixel_pilot", "rune_runner", "ascii_artist", "regex_ranger", "static_star",
  "dynamic_dan", "sigma_scribe", "gamma_geek", "omega_one", "zeta_zen", "alpha_arc",
  "beta_blade", "delta_drift", "kappa_king", "lambda_lance", "nano_nomad",
  "pico_pilot", "qubit_queen", "tau_titan", "swift_sora", "rusty_raja", "neon_naomi",
  "ember_ed", "fjord_fox", "glacier_gus", "hexa_hira", "iron_iggy", "jade_juno",
  "kite_kira", "lotus_leo", "moss_mira", "nova_nina", "onyx_otto", "pearl_paul",
  "quartz_qiu", "rune_rio", "silk_sami", "topaz_tia", "umbra_uli", "vega_van",
  "wisp_wren", "xeno_xia", "yarn_yuki", "zen_zara", "code_caleb", "data_dora",
  "echo_evan", "fold_finn", "geo_gwen", "hop_hank", "ink_ivy", "jot_jules",
  "kit_kris", "log_lex", "map_mia", "node_nox", "opal_orin", "pad_pia", "quill_qi",
  "ray_rune", "sky_sage", "tide_tex", "void_vix", "wave_win", "xen_xan", "yam_yuri",
  "zap_zed", "ember_eli", "flux_fae",
];

const COUNTRIES: { name: string; flag: string }[] = [
  { name: "India", flag: "🇮🇳" }, { name: "USA", flag: "🇺🇸" }, { name: "Germany", flag: "🇩🇪" },
  { name: "Brazil", flag: "🇧🇷" }, { name: "Japan", flag: "🇯🇵" }, { name: "UK", flag: "🇬🇧" },
  { name: "Canada", flag: "🇨🇦" }, { name: "France", flag: "🇫🇷" }, { name: "China", flag: "🇨🇳" },
  { name: "Australia", flag: "🇦🇺" }, { name: "Korea", flag: "🇰🇷" }, { name: "Russia", flag: "🇷🇺" },
  { name: "Spain", flag: "🇪🇸" }, { name: "Mexico", flag: "🇲🇽" }, { name: "Italy", flag: "🇮🇹" },
];

const initials = (s: string) =>
  s.split("_").map((p) => p[0]?.toUpperCase()).join("").slice(0, 2);

export const LEADERBOARD: LbUser[] = NAMES.slice(0, 100).map((username, i) => {
  const country = COUNTRIES[i % COUNTRIES.length]!;
  return {
    rank: i + 1,
    username,
    avatar: initials(username),
    problemsSolved: 500 - i * 4 - (i % 7),
    score: 9850 - i * 92 - (i % 13) * 3,
    streak: Math.max(1, 120 - i * 2 - (i % 5)),
    accuracy: Math.max(45, 98 - i - (i % 3) * 2),
    country: country.name,
    flag: country.flag,
  };
});
