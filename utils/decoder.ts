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
    // console.log(data_list)

    return data_list
};