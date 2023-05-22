{
  /*
   dist === true && (
     <section
       style={{
         backgroundColor: white,
         transform: `translateY(${translate})`,
       }}
       className="second_section"
     >
       <button
         style={{ backgroundColor: white, color: lightText }}
         className="back_button"
         onClick={() => setDist(false)}
       >
         <i className="fa-solid fa-arrow-left back_arrow"></i> Back
       </button>
       <div className="full_details">
         <img
           className="part1"
           style={{ height: "320px" }}
           src={val.flags.png}
           alt=""
         />
         <div style={{ height: "320px", color: lightText }} className="part2">
           <p className="full_details_heading">{val.name}</p>
           <div className="full_details_part">
             <div>
               <p className="details_text">
                 Native Name: <span>{val.nativeName}</span>
               </p>
               <p className="details_text">
                 Population: <span>{val.population}</span>
               </p>
               <p className="details_text">
                 Region: <span>{val.region}</span>
               </p>
               <p className="details_text">
                 Sub Region: <span>{val.subregion}</span>
               </p>
               <p className="details_text">
                 Capital: <span>{val.capital}</span>
               </p>
             </div>
             <div>
               <p className="details_text">
                 Top Level Domain: <span>{val.topLevelDomain}</span>
               </p>
               <p className="details_text">
                 {val.currencies.forEach((c) => (currency += " " + c.name))}
                 Currencies: <span>{currency}</span>
               </p>
               <p className="details_text">
                 Languages:
                 {val.languages.forEach((n) => (language += " " + n.name))}
                 <span>{language}</span>
               </p>
             </div>
           </div>
         </div>
       </div>
     </section>
   );
      */
}
