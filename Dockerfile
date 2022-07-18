FROM ubuntu

RUN apt clean
#RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y gcc g++ make git autoconf
RUN apt update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y software-properties-common lsb-release
RUN lsb_release -a
RUN add-apt-repository ppa:uroni/urbackup
RUN apt update
RUN apt install urbackup-server

#RUN git clone https://github.com/uroni/urbackup_backend
#WORKDIR urbackup_backend
#RUN ./switch_build.sh server
#RUN autoreconf --install
#RUN ./configure
#RUN make -j8
