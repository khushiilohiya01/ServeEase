export function StructuralFrame() {
  return (
    <>
      {/* 1. OUTER SLABS & STRUCTURAL WALLS */}
      <rect
        x="12"
        y="12"
        width="856"
        height="516"
        rx="18"
        fill="#FAFBF8"
        stroke="#173D32"
        strokeWidth="3.5"
      />

      {/* Horizontal floor dividing slab */}
      <rect
        x="12"
        y="266"
        width="856"
        height="12"
        fill="#DDE4DB"
        stroke="#173D32"
        strokeWidth="2"
      />

      {/* Vertical dividing walls upper floor */}
      <rect
        x="368"
        y="12"
        width="10"
        height="254"
        fill="#DDE4DB"
        stroke="#173D32"
        strokeWidth="2"
      />
      <rect
        x="618"
        y="12"
        width="10"
        height="254"
        fill="#DDE4DB"
        stroke="#173D32"
        strokeWidth="2"
      />

      {/* Vertical dividing wall lower floor (Kitchen vs Hall) */}
      <rect
        x="368"
        y="278"
        width="10"
        height="250"
        fill="#DDE4DB"
        stroke="#173D32"
        strokeWidth="2"
      />
    </>
  );
}
