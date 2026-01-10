import React from 'react';

export const GuidelineLayer: React.FC = () => {
    // Independent Path Logic for GSAP Animation
    // 7 Separate Paths for individual control (P1->P2, P2->P3, etc.)
    // Hidden lines behind cards are removed to allow sequential "Appear -> Draw -> Appear" animation.

    // COORDINATES STRICTLY PRESERVED FROM USER'S MANUAL EDITS
    const points = {
        p1_bottom: { x: 1376, y: 533 },

        p2_entry: { x: 600, y: 800 }, // User Fixed
        p2_exit: { x: 600, y: 900 },  // User Fixed

        p3_entry: { x: 1212, y: 1537 },
        p3_exit: { x: 1444, y: 1800 },

        p4_entry: { x: 781, y: 2040 },
        p4_exit: { x: 548, y: 2302 }, // User Fixed

        p5_entry: { x: 1137, y: 2805 }, // User Fixed (Left Entry)
        p5_exit: { x: 1369, y: 2867 },  // User Fixed (Exit Bottom)

        p6_entry: { x: 735, y: 3286 },  // User Fixed
        p6_exit: { x: 510, y: 3548 },   // User Fixed

        p7_entry: { x: 928, y: 4009 },  // Entry Left
        p7_exit: { x: 1160, y: 4171 },  // Exit Bottom

        cta_top: { x: 972, y: 4500 }
    };

    // Helper for Bezier Curve (M Start -> C CP1 CP2 End)
    const getPath = (start: { x: number, y: number }, end: { x: number, y: number }, cp1: { x: number, y: number }, cp2: { x: number, y: number }) => {
        return `M ${start.x} ${start.y} C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${end.x} ${end.y}`;
    };

    // 7 Independent Path Definitions
    const paths = [
        // Seg 1: P1 Bottom -> P2 Entry
        getPath(points.p1_bottom, points.p2_entry,
            { x: 1376, y: 800 }, // CP1: Deep Down
            { x: 900, y: 550 }   // CP2: Horizontal Out
        ),
        // Seg 2: P2 Exit -> P3 Entry
        getPath(points.p2_exit, points.p3_entry,
            { x: 600, y: 900 },  // CP1: Down-Right
            { x: 1012, y: 1537 } // CP2: Right-In
        ),
        // Seg 3: P3 Exit -> P4 Entry
        getPath(points.p3_exit, points.p4_entry,
            { x: 1444, y: 2000 }, // CP1: Down-Left
            { x: 981, y: 2140 }   // CP2: Left-In
        ),
        // Seg 4: P4 Exit -> P5 Entry (Wide Bowl)
        getPath(points.p4_exit, points.p5_entry,
            { x: 800, y: 2800 },  // CP1: Wide right shift
            { x: 928, y: 2800 }   // CP2: Matched depth
        ),
        // Seg 5: P5 Exit -> P6 Entry
        getPath(points.p5_exit, points.p6_entry,
            { x: 1369, y: 3000 }, // CP1: Down-Left
            { x: 1655, y: 3386 }  // CP2: Left-In (User Fixed X=1655)
        ),
        // Seg 6: P6 Exit -> P7 Entry
        getPath(points.p6_exit, points.p7_entry,
            { x: 502, y: 3850 }, // CP1: Down-Right
            { x: 800, y: 4009 }  // CP2: Right-In
        ),
        // Seg 7: P7 Exit -> CTA Top
        getPath(points.p7_exit, points.cta_top,
            { x: 1160, y: 4400 }, // CP1: Down
            { x: 972, y: 4400 }   // CP2: Up
        )
    ];

    return (
        <div className="absolute top-0 left-0 w-[1920px] h-full pointer-events-none z-0">
            <svg
                width="1920"
                height="100%"
                className="overflow-visible"
                style={{ height: '100%' }}
            >
                <defs>
                    {paths.map((d, index) => (
                        <mask key={`mask-def-${index}`} id={`mask-${index + 1}`}>
                            <path
                                id={`mask-path-${index + 1}`} // Animate THIS strokeDashoffset
                                d={d}
                                stroke="white"
                                strokeWidth="5" // Wider than visible stroke
                                fill="none"
                                // Universal "Draw" trick: Huge dasharray
                                strokeDasharray="10000"
                                strokeDashoffset="10000"
                            />
                        </mask>
                    ))}
                </defs>

                {paths.map((d, index) => (
                    <path
                        key={`visible-${index}`}
                        d={d}
                        fill="none"
                        stroke="#242527"
                        strokeWidth="2"
                        strokeDasharray="13 13" // Visible dashes
                        strokeLinecap="round"
                        className="opacity-40"
                        mask={`url(#mask-${index + 1})`} // Apply mask
                    />
                ))}
            </svg>
        </div>
    );
};
