import Button from '@/src/components/Button'
import ClientOnly from '@/src/components/ClientOnly'
import CollectionModal from '@/src/components/Collections/CollectionModal'
import ImageDefaultError from '@/src/components/Img/ImageDefaultError'
import { useQueryAnimeDetailQuery } from '@/src/graphql/generated'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
	id: string
}

export default function AnimeDetail({ id }: Props) {
	const [showModal, setShowModal] = useState(false)

	const { data, loading, error } = useQueryAnimeDetailQuery({
		variables: {
			id: parseInt(id),
			asHtml: true,
		},
	})

	return (
		<div>
			<Button onClick={() => setShowModal(true)}>
				Add To Collection
			</Button>

			<h3>{data?.Media?.title?.romaji}</h3>
			<div>
				{data?.Media?.genres?.map((genre, idx) => (
					<p key={idx}>{genre}</p>
				))}
			</div>
			<div>
				{/* if undefined change placeholder */}
				<Image
					src={
						data?.Media?.coverImage?.large ??
						'https://placehold.co/600x400'
					}
					alt='cover anime'
					width={320}
					height={160}
				/>
			</div>
			<h4>Rankings</h4>
			{data?.Media?.rankings?.map(ranking => (
				<div key={ranking?.id}>
					<p>Year: {ranking?.year}</p>
					<p>Rank: {ranking?.rank}</p>
				</div>
			))}
			{data?.Media?.description && (
				<div>
					<h3>Description</h3>
					<div
						dangerouslySetInnerHTML={{
							__html: data?.Media?.description,
						}}
					/>
				</div>
			)}
			<CollectionModal
				isShow={showModal}
				setShow={setShowModal}
				animeId={id}
			/>
		</div>
	)
}
