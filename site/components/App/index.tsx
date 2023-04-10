import ExportWrapper from 'toy-react-export-wrapper';

export default function App() {
    return (
        <div style={{height: '100vh', padding: 40}}>
            <ExportWrapper
                api="/api/test_api"
                query={{name: 'lh', age: '23'}}
                target="_self"
            >
                <button>导出</button>
            </ExportWrapper>
        </div>
    );
}
