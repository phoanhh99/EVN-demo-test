import jQuery from 'jquery'
window.$ = window.jQuery = jQuery
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '/src/css/index.css'
import logoSmall from '../img/logo-small.svg'
import profilePicture from '../img/Profile.jpg'
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from 'chart.js'
import moment from 'moment'

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
)
$(() => {
  //for demo test purposes
  $('#settingBtn').on('click', () =>
    $('#cogMenu').dropdown({
      offset: 2,
    })
  )
  $('#logoBrand').attr('src', logoSmall)
  FillUserInfo()
  FillDetail()
  InitChart()

  async function FillUserInfo() {
    const data = await $.get('/GetUser')
    if (!data || data.length === 0) return false
    const {fullname, uid} = data
    const TAB_NAME = $('ul.navbar-nav').find('.active').text().trim()
    $('#username').text(`${fullname}`)
    $('.welcome_user')
      .empty()
      .append(
        `Xin chào ${fullname}, <span style="color: #164399;">${TAB_NAME}</span>`
      )
    $('#user_info')
      .empty()
      .append(`${fullname}<br><span class="text-muted">${uid}</span>`)

    $('.user-img').attr('src', profilePicture)
  }

  function FillDetail() {
    $.when($.get('/GetTime'), $.get('/GetThongSo')).then((data1, data2) => {
      const {FIXED_TIME} = data1[0]
      const TARIFF_LIST = JSON.parse(data2[0])
      const NEXT_MONTH = moment(FIXED_TIME, 'DD/MM/YYYY HH:mm', 'vi')
        .add('1', 'month')
        .format('MMMM')

      const FIXED_PARAMETER = TARIFF_LIST.map(v =>
        parseFloat(v.value.replace(',', ''))
      )
        .reduce((prev, curr) => prev + curr)
        .toFixed(2)

      $('.summary_text').text(
        Intl.NumberFormat('en-IN', {maximumFractionDigits: 2}).format(
          FIXED_PARAMETER
        ) + ' kWh'
      )
      $('#time').text(FIXED_TIME)
      $('#month').text(NEXT_MONTH)
      TARIFF_LIST.forEach((v, i) => {
        const progessValue =
          (parseFloat(v.value.replace(',', '')) / FIXED_PARAMETER) * 100
        const html =
          `<div class="col-lg-4 p-3 ${
            i === 0
              ? 'border-right'
              : i === TARIFF_LIST.length - 1
              ? 'border-left'
              : ''
          }">` +
          `<p class="text-muted" style="">
          <span class="fa-stack">
          <i class="fas fa-rectangle-landscape fa-stack-2x" style="color: ${v.color}; border-radius:3px"></i>
          <i class="fas fa-folder fa-stack-1x fa-inverse"></i>
          </span> Biểu giá ${v.id}</p>` +
          `<h4>${v.value}</h4>` +
          `<div class="progress" style="height: 2px;">` +
          `<div class="progress-bar" style="background-color: ${v.color} !important; width: ${progessValue}%;" role="progressbar"></div>` +
          `</div>` +
          `</div>`
        $('.tariff_list_container').append(html)
      })
    })
  }

  function InitChart() {
    const ctx = document.getElementById('chart-detail').getContext('2d')
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, '#1871C6')
    gradient.addColorStop(1, '#1F469A')

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [30, 40, 90, 147, 101, 128, 80],
        datasets: [
          {
            label: 'My First Dataset',
            backgroundColor: 'rgba(24, 113, 198, 0.5)',
            borderColor: 'rgba(24, 113, 198, 0.5)',
            hoverBackgroundColor: gradient,
            borderRadius: 4,
            borderWidth: 1,
            data: [30, 40, 90, 147, 101, 128, 80],
          },
        ],
      },
      options: {
        plugins: {
          legend: false,
          tooltip: {
            displayColors: false,
            callbacks: {
              title: () => '',
              label: context => context.label,
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    })
    myChart.tooltip.setActiveElements([
      {datasetIndex: 0, index: myChart.data.datasets[0].data.indexOf(128)},
    ])
    myChart.setActiveElements([
      {datasetIndex: 0, index: myChart.data.datasets[0].data.indexOf(128)},
    ])
    myChart.update()
  }
}, jQuery)
