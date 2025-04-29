export function ShowSelection({ onSearch }) {
    return (
        <div className="field is-horizontal" role="group" aria-labelledby="showSelectionLabel">
            <div className="field-label is-normal">
                <label id="showSelectionLabel" htmlFor="showTitle" className="label">
                    Titre
                </label>
            </div>
            <div className="field-body">
                <div className="field">
                    <p className="control is-expanded">
                        <input 
                            id="showTitle" 
                            className="input" 
                            type="text" 
                            placeholder="Entrer le nom" 
                            aria-required="true" 
                            aria-describedby="showSelectionHelp"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                        
                    </p>
                </div>
            </div>
        </div>
    );
}
