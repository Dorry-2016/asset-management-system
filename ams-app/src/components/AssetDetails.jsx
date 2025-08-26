// import React from 'react';

// const AssetDetails = ({ asset, onClose }) => {
//   if (!asset) return null;

//   return (
//     <div className="asset-details-overlay">
//       <div className="asset-details-modal">
//         <button className="close-btn" onClick={onClose}>×</button>
//         <h3> Details</h3>
//         <div className="asset-details-content">
//           <div className="asset-details-image">
//             <img src={`http://localhost:5000/Images/${asset.image}`} alt={asset.name} />
//           </div>
//           <div className="asset-details-info">
//             <p><strong>Nom produit:</strong> {asset.name}</p>
//             <p><strong>Prix:</strong> {asset.price ? asset.price + " DH" : "N/A"}</p>
//             <p><strong>Quantité:</strong> {asset.quantity || "N/A"}</p>
//             <p><strong>Date livraison:</strong> {asset.purchasedate?.split('T')[0]}</p>
//             <p><strong>Catégorie:</strong> {asset.category_name}</p>
//             <p><strong>Marque:</strong> {asset.brand || "N/A"}</p>
//           </div>
//         </div>
//         <div className="asset-description">
//           <p>{asset.description || "No description available."}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AssetDetails;
