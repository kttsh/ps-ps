// import React, { useRef } from "react";
// import * as wjcCore from "@mescius/wijmo";
// import * as wjGrid from "@mescius/wijmo.react.grid";

// const CloseRowGroups = () => {
//     const gridRef = useRef<wjGrid.FlexGrid | null>(null);

//     const handleCollapseGroups = () => {
//         const grid = gridRef.current;
//         if (grid?.collectionView?.canGroup) {
//             grid.collectionView.collapseGroups();
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleCollapseGroups}>すべてのグループを閉じる</button>
//             <wjGrid.FlexGrid
//                 ref={gridRef}
//                 itemsSource={new wjcCore.CollectionView([
//                     { name: "A", group: "G1" },
//                     { name: "B", group: "G1" },
//                     { name: "C", group: "G2" },
//                 ], {
//                     groupDescriptions: [new wjcCore.PropertyGroupDescription("group")]
//                 })}
//             />
//         </div>
//     );
// };

// export default CloseRowGroups;
