export const decoderRepos = (input: any) => {
    const text = `${input}`;
    const repos = text.split('%26');
    if (repos.length === 0) {
        return []
    }
    const data_list = repos.map((rep) => ({
        owner: rep.split('%40')[0],
        repo_name: rep.split('%40')[1]
    }))

    return data_list
};

export const decodeHash = (hash: string | null) => {
    if (hash === null) return []
    
    const hash_data = hash.slice(1);
    const data = hash_data.split('&').map((el:string) => ({
      owner: el.split('/')[0],
      name: el.split('/')[1]
    }));
    // const repos = decoderRepos(hash_data.split('%40')[1]);
    return data
}