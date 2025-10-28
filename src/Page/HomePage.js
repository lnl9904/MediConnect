import React, { useEffect, useState } from 'react';
import '../style/main.css';

const HomePage = ({ user }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=diabetes&retmode=json&retmax=5')
            .then(res => res.json())
            .then(data => {
                const ids = data.esearchresult.idlist;
                fetchSummaries(ids);
            });
    }, []);

    const fetchSummaries = (ids) => {
        const idString = ids.join(',');
        fetch(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${idString}&retmode=json`)
            .then(res => res.json())
            .then(data => {
                const summaries = Object.values(data.result).filter(item => item.uid).map(item => ({
                    title: item.title,
                    source: item.source,
                    pubdate: item.pubdate
                }));
                setArticles(summaries);
            });
    };


    return (
        <main className="main-content">
            <h2>Welcome, {user?.name || 'Guest'}!</h2>
            <section>
                <h3>📚 Bài viết y học từ PubMed</h3>
                <ul>
                    {articles.map((article, index) => (
                        <li key={index}>
                            <strong>{article.title}</strong><br />
                            <em>{article.source}</em> – {article.pubdate}
                        </li>
                    ))}
                </ul>
            </section>


        </main>
    );
};

export default HomePage;
