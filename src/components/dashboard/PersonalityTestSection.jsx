export const BlocTransitionComponent = ({ blocName, nextBlocName, onNext, isLast }) => {
    return (
        <div className="text-center p-6">
            <div className="mb-4">
                <i className="pi pi-check-circle text-green-500" style={{ fontSize: '5rem' }}></i>
            </div>
            <h2 className="text-3xl font-bold mb-3">Bravo !</h2>
            <p className="text-xl text-700 mb-5">
                Vous venez de terminer le <strong>{blocName}</strong>.
            </p>
            {isLast ? (
                <Button label="Voir mes résultats sur le Dashboard" icon="pi pi-th-large" className="p-button-lg" onClick={onNext} />
            ) : (
                <div>
                    <p className="mb-4 text-600 italic">Bloc suivant : {nextBlocName}</p>
                    <Button label="Commencer le bloc suivant" icon="pi pi-arrow-right" className="p-button-lg" onClick={onNext} />
                </div>
            )}
        </div>
    );
};