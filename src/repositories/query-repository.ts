// repository - дата-слой

const queryRepository = {

    getVideos(): VideoOutputModel[] {
        const dbVideos: DBVideoType[] = []
        const dbAuthors: DBAuthorType[] = []

        return dbVideos.map(dbVideo => {
            const author = dbAuthors.find(a => a._id === dbVideo.authorId)
            return this._mapDBVideoToOutputModel(dbVideo, author!)
        })
    },
    getVideoById(_id: string): VideoOutputModel {
        const dbVideo: DBVideoType = {
            _id: '123',
            title: 'React',
            authorId: '456',
            banEntity: null
        }
        const dbAuthor: DBAuthorType = {
            _id: '456',
            firstName: 'Dimych',
            lastName: 'Kuz'
        }

        return this._mapDBVideoToOutputModel(dbVideo, dbAuthor)
    },
    getBannedVideos(_id: string): BannedVideoOutputModel[] {
        const dbVideos: DBVideoType[] = []
        const dbAuthors: DBAuthorType[] = []

        return dbVideos.map(dbVideo => {
            const author = dbAuthors.find(a => a._id === dbVideo.authorId)

            return {
                id: dbVideo._id,
                title: dbVideo.title,
                author: {
                    id: author!._id,
                    name: author!.firstName + '' + author!.lastName
                },
                banReason: dbVideo.banEntity!.banReason
            }

        })
    },
    _mapDBVideoToOutputModel(dbVideo: DBVideoType, dbAuthor: DBAuthorType) {
        return {
            id: dbVideo._id,
            title: dbVideo.title,
            author: {
                id: dbAuthor!._id,
                name: dbAuthor!.firstName + '' + dbAuthor!.lastName
            }
        }
    }

}

// types
export type VideoOutputModel = {
    id: string
    title: string
    author: {
        id: string
        name: string
    }
}

export type BannedVideoOutputModel = VideoOutputModel & {
   banReason: string
}

type DBVideoType = {
    _id: string
    title: string
    authorId: string
    banEntity: null | {
        isBanned: boolean
        banReason: string
    }

}
type DBAuthorType = {
    _id: string
    firstName: string
    lastName: string
}