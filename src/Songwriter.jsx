import React, { useState } from 'react';
import './Songwriter.css';
// import ChordSuggestion from '@/components/music/chordSuggestion'; // Adjust the import path as necessary

const SongwritingEditor = () => {
    const [lyrics, setLyrics] = useState('');
    const [savedLyrics, setSavedLyrics] = useState(null);
    const [simpleMode, setSimpleMode] = useState(false);
    const [sections, setSections] = useState({});

    const handleSave = () => {
        setSavedLyrics(lyrics);
    };

    const handleClear = () => {
        setLyrics('');
    };

    return (
        <div className="container">
            <h1 className="title">Songwriter</h1>
            <input
                type="text"
                placeholder="Title"
                className="titleInput"
            />
            {simpleMode ? (
            <div className="editorContainer">
                <textarea
                    className="textInput"
                    placeholder="Start writing your song..."
                    value={lyrics}
                    onChange={(e) => setLyrics(e.target.value)}
                />
            </div>) : (
            <div>
                <SongSection title="Verse 1" lyrics={lyrics} />
                <SongSection title="Chorus" lyrics={lyrics} />
                <SongSection title="Verse 2" lyrics={lyrics} />
                <SongSection title="Chorus" lyrics={lyrics} />
                <SongSection title="Bridge" lyrics={lyrics} />
                <SongSection title="Chorus" lyrics={lyrics} />
            </div>
            )
}
            <div className="buttonContainer">
                <button onClick={handleSave} className="button saveButton">Save</button>
                <button onClick={handleClear} className="button clearButton">Clear</button>
            </div>
            {savedLyrics && (
                <div className="savedContainer">
                    <h2 className="savedTitle">Saved Lyrics:</h2>
                    <p className="savedLyrics">{savedLyrics}</p>
                </div>
            )}
            {/* <div className="chordSuggestionContainer">
                <ChordSuggestion />
            </div> */}
        </div>
    );
};

const SongSection = ({ title, lyrics }) => {
    return (
        <div className="editorContainer">
        <input type="text" placeholder="Section... (Chorus, Verse 1, etc.)" className="sectionInput" />
        <textarea
            className="textInput"
            placeholder="Start writing your song..."
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
        />
    </div>
    );
}

const styles = {
    container: {
        padding: '16px',
        backgroundColor: '#e2daca',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        marginTop: '30px',
        textAlign: 'center',
        color: '#414535',
    },
    titleInput: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
        color: '#414535',
        backgroundColor: '#f0ece4',
        borderRadius: '8px',
        padding: '10px',
        borderWidth: '1px',
        borderColor: '#618985',
        display: 'block',
        width: '100%',
        boxSizing: 'border-box',
    },
    editorContainer: {
        marginBottom: '20px',
        backgroundColor: '#f0ece4',
        borderRadius: '8px',
        padding: '10px',
        borderWidth: '1px',
        borderColor: '#618985',
    },
    textInput: {
        width: '100%',
        fontSize: '16px',
        lineHeight: '24px',
        color: '#414535',
        border: 'none',
        outline: 'none',
        resize: 'none',
        height: '200px',
        boxSizing: 'border-box',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginVertical: '10px',
    },
    button: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        cursor: 'pointer',
    },
    savedContainer: {
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#C19875',
        borderRadius: '8px',
    },
    savedTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#414535',
    },
    savedLyrics: {
        fontSize: '16px',
        lineHeight: '24px',
        color: '#2e7d32',
    },
    chordSuggestionContainer: {
        marginTop: '20px',
    },
};

export default SongwritingEditor;
