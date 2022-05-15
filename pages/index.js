import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import prisma from 'lib/prisma'

export default function Home({ cars,firstCar }) {
  return <div clasName={styles.container}>
    <p>First car: {firstCar.brand} - {firstCar.model}</p>
    <ul>
      {cars.map((car,index) => {
        return  <li key={index}>
                  {car.brand} - {car.model}
                </li>
      })}
    </ul>
  </div>
}

export async function getServerSideProps() {

  let cars = await prisma.car.findMany()

  let firstCar = await prisma.car.findUnique({
    where : {
      id: 1
    }
  })

  cars = JSON.parse(JSON.stringify(cars)) //convert dates to strings

  firstCar = JSON.parse(JSON.stringify(firstCar)) //convert dates to strings

  return {
    props: {
      cars,
      firstCar,
    },
  }
}